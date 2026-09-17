import Foundation
import AVFoundation

// Lead with open water; keep the two closing boat shots to brief accents.
// Exclude original brand titles and hull branding.
let asset = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
let composition = AVMutableComposition()
var cursor = CMTime.zero
for (start, end) in [(6.8, 9.75), (14.1, 14.7), (14.8, 15.35), (16.2, 16.45)] {
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
