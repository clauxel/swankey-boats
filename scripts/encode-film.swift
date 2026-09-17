import Foundation
import AVFoundation
import CoreVideo

let asset = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
// An explicit edit duration avoids extra tail padding in retimed export tracks.
let duration = CommandLine.arguments.count > 3
    ? CMTime(seconds: Double(CommandLine.arguments[3])!, preferredTimescale: 600)
    : asset.duration
let reader = try AVAssetReader(asset: asset)
reader.timeRange = CMTimeRange(start: .zero, duration: duration)
let writer = try AVAssetWriter(outputURL: URL(fileURLWithPath: CommandLine.arguments[2]), fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true
let group = DispatchGroup()
var pairs: [(AVAssetReaderTrackOutput, AVAssetWriterInput)] = []
for track in asset.tracks {
    if track.mediaType == .video {
        let output = AVAssetReaderTrackOutput(track: track, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
        let size = track.naturalSize
        let input = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: size.width, AVVideoHeightKey: size.height, AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 5_000_000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel, AVVideoMaxKeyFrameIntervalKey: 24]])
        reader.add(output); writer.add(input); pairs.append((output,input))
    } else if track.mediaType == .audio {
        let output = AVAssetReaderTrackOutput(track: track, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
        let input = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey:kAudioFormatMPEG4AAC, AVSampleRateKey:44100, AVNumberOfChannelsKey:2, AVEncoderBitRateKey:128000])
        reader.add(output); writer.add(input); pairs.append((output,input))
    }
}
guard writer.startWriting(), reader.startReading() else { fatalError("Cannot start media conversion") }
writer.startSession(atSourceTime: .zero)
for (index,pair) in pairs.enumerated() {
    let (output,input) = pair
    group.enter()
    input.requestMediaDataWhenReady(on: DispatchQueue(label:"swankey.encode.\(index)")) {
        while input.isReadyForMoreMediaData {
            if let sample = output.copyNextSampleBuffer() {
                if !input.append(sample) { fatalError(writer.error?.localizedDescription ?? "Append failed") }
            } else {
                input.markAsFinished(); group.leave(); break
            }
        }
    }
}
group.wait()
if let error = reader.error { fatalError(error.localizedDescription) }
writer.endSession(atSourceTime: duration)
let done = DispatchSemaphore(value:0)
writer.finishWriting { done.signal() }
done.wait()
if let error = writer.error { fatalError(error.localizedDescription) }
print("Flattened H.264 MP4: \(CMTimeGetSeconds(duration)) seconds")
