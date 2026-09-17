import Foundation
import AVFoundation
import CoreImage
import CoreVideo

struct Crop: Decodable { let x: Double; let y: Double; let width: Double; let height: Double }
struct Clip: Decodable {
    let path: String
    let startSeconds: Double
    let cropStart: Crop?
    let cropEnd: Crop?
}
struct Edit: Decodable {
    let width: Int
    let height: Int
    let framesPerSecond: Int
    let shotSeconds: Int
    let clips: [Clip]
    let audioPath: String?
    let audioStartSeconds: Double?
}

// Encode an explicit frame timeline instead of MP4 edit lists. Every shot gets
// exactly shotSeconds * framesPerSecond frames, with no source tail flashes.
let edit = try JSONDecoder().decode(Edit.self, from: Data(contentsOf: URL(fileURLWithPath: CommandLine.arguments[1])))
let destination = URL(fileURLWithPath: CommandLine.arguments[2])
guard !edit.clips.isEmpty, edit.width > 0, edit.height > 0, edit.framesPerSecond > 0, edit.shotSeconds > 0 else { fatalError("Invalid edit") }
let writer = try AVAssetWriter(outputURL: destination, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true
let video = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: edit.width, AVVideoHeightKey: edit.height,
    AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 5_000_000, AVVideoMaxKeyFrameIntervalKey: edit.framesPerSecond],
])
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: video, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: edit.width, kCVPixelBufferHeightKey as String: edit.height,
    kCVPixelBufferCGImageCompatibilityKey as String: true,
    kCVPixelBufferCGBitmapContextCompatibilityKey as String: true,
])
writer.add(video)
let duration = CMTime(seconds: Double(edit.clips.count * edit.shotSeconds), preferredTimescale: 600)
var audioReader: AVAssetReader?
var audioOutput: AVAssetReaderTrackOutput?
var audioInput: AVAssetWriterInput?
if let path = edit.audioPath {
    let asset = AVURLAsset(url: URL(fileURLWithPath: path))
    if let track = asset.tracks(withMediaType: .audio).first {
        let reader = try AVAssetReader(asset: asset)
        reader.timeRange = CMTimeRange(start: CMTime(seconds: edit.audioStartSeconds ?? 0, preferredTimescale: 600), duration: duration)
        let output = AVAssetReaderTrackOutput(track: track, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
        let input = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 44100, AVNumberOfChannelsKey: 2, AVEncoderBitRateKey: 128000])
        reader.add(output); writer.add(input)
        audioReader = reader; audioOutput = output; audioInput = input
    }
}
guard writer.startWriting() else { fatalError(String(describing: writer.error)) }
writer.startSession(atSourceTime: .zero)
let audioDone = DispatchGroup()
if let reader = audioReader, let output = audioOutput, let input = audioInput {
    guard reader.startReading() else { fatalError(String(describing: reader.error)) }
    audioDone.enter()
    input.requestMediaDataWhenReady(on: DispatchQueue(label: "swankey.audio")) {
        while input.isReadyForMoreMediaData {
            if let sample = output.copyNextSampleBuffer() {
                var timing = CMSampleTimingInfo(duration: CMSampleBufferGetDuration(sample), presentationTimeStamp: CMTimeSubtract(CMSampleBufferGetPresentationTimeStamp(sample), CMTime(seconds: edit.audioStartSeconds ?? 0, preferredTimescale: 600)), decodeTimeStamp: .invalid)
                var shifted: CMSampleBuffer?
                guard CMSampleBufferCreateCopyWithNewTiming(allocator: kCFAllocatorDefault, sampleBuffer: sample, sampleTimingEntryCount: 1, sampleTimingArray: &timing, sampleBufferOut: &shifted) == noErr, let shifted = shifted, input.append(shifted) else { fatalError(String(describing: writer.error)) }
            } else {
                if let error = reader.error { fatalError(String(describing: error)) }
                input.markAsFinished(); audioDone.leave(); break
            }
        }
    }
}

let context = CIContext(options: [.cacheIntermediates: false])
let framesPerShot = edit.framesPerSecond * edit.shotSeconds
var written = 0
for clip in edit.clips {
    let asset = AVURLAsset(url: URL(fileURLWithPath: clip.path))
    guard clip.startSeconds >= 0, CMTimeGetSeconds(asset.duration) >= clip.startSeconds + Double(edit.shotSeconds), let track = asset.tracks(withMediaType: .video).first else { fatalError("Clip is shorter than the requested range") }
    let reader = try AVAssetReader(asset: asset)
    let output = AVAssetReaderTrackOutput(track: track, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
    reader.add(output)
    guard reader.startReading() else { fatalError(String(describing: reader.error)) }
    var sample = output.copyNextSampleBuffer()
    var nextSample = output.copyNextSampleBuffer()
    for frame in 0..<framesPerShot {
        let target = clip.startSeconds + Double(frame) / Double(edit.framesPerSecond)
        while let next = nextSample, CMTimeGetSeconds(CMSampleBufferGetPresentationTimeStamp(next)) <= target + 0.00001 {
            sample = next
            nextSample = output.copyNextSampleBuffer()
        }
        guard let current = sample, let sourceBuffer = CMSampleBufferGetImageBuffer(current) else { fatalError("Source video ended inside a shot") }
        while !video.isReadyForMoreMediaData {
            if let error = writer.error { fatalError(String(describing: error)) }
            Thread.sleep(forTimeInterval: 0.002)
        }
        var destinationBuffer: CVPixelBuffer?
        guard let pool = adaptor.pixelBufferPool, CVPixelBufferPoolCreatePixelBuffer(nil, pool, &destinationBuffer) == kCVReturnSuccess, let buffer = destinationBuffer else { fatalError("Cannot allocate output frame") }
        var source = CIImage(cvPixelBuffer: sourceBuffer).transformed(by: track.preferredTransform)
        if let from = clip.cropStart {
            let to = clip.cropEnd ?? from
            let progress = Double(frame) / Double(max(framesPerShot - 1, 1))
            func interpolate(_ a: Double, _ b: Double) -> Double { a + (b - a) * progress }
            let x = interpolate(from.x, to.x)
            let y = interpolate(from.y, to.y)
            let width = interpolate(from.width, to.width)
            let height = interpolate(from.height, to.height)
            guard x >= 0, y >= 0, width > 0, height > 0, x + width <= 1.0001, y + height <= 1.0001 else { fatalError("Crop is outside the source frame") }
            let bounds = source.extent
            source = source.cropped(to: CGRect(x: bounds.minX + x * bounds.width, y: bounds.minY + (1 - y - height) * bounds.height, width: width * bounds.width, height: height * bounds.height))
        }
        let scale = max(Double(edit.width) / source.extent.width, Double(edit.height) / source.extent.height)
        let scaled = source.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
        let centered = scaled.transformed(by: CGAffineTransform(translationX: (Double(edit.width) - scaled.extent.width) / 2 - scaled.extent.minX, y: (Double(edit.height) - scaled.extent.height) / 2 - scaled.extent.minY))
        context.render(centered, to: buffer)
        guard adaptor.append(buffer, withPresentationTime: CMTime(value: Int64(written), timescale: Int32(edit.framesPerSecond))) else { fatalError(String(describing: writer.error)) }
        written += 1
    }
    reader.cancelReading()
}
video.markAsFinished()
audioDone.wait()
writer.endSession(atSourceTime: duration)
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
if let error = writer.error { fatalError(String(describing: error)) }
print("Assembled \(edit.clips.count) shots, \(written) frames, \(CMTimeGetSeconds(duration)) seconds; audio=\(audioInput != nil)")
