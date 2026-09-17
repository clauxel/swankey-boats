import Foundation
import AVFoundation

// Keep the lake/aerial sequences; exclude original brand titles and hull close-ups.
let asset = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
let composition = AVMutableComposition()
var cursor = CMTime.zero
for (start, end) in [(6.8, 9.75), (14.1, 16.6)] {
    let range = CMTimeRange(start: CMTime(seconds: start, preferredTimescale: 600), duration: CMTime(seconds: end - start, preferredTimescale: 600))
    try composition.insertTimeRange(range, of: asset, at: cursor)
    cursor = CMTimeAdd(cursor, range.duration)
}
let session = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality)!
session.outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
session.outputFileType = .mp4
session.shouldOptimizeForNetworkUse = true
let semaphore = DispatchSemaphore(value: 0)
session.exportAsynchronously { semaphore.signal() }
semaphore.wait()
if let error = session.error { fatalError(error.localizedDescription) }
print("Exported lake and aerial edit: \(CMTimeGetSeconds(cursor)) seconds")
