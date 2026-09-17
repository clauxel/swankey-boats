import Foundation
import AVFoundation

// Lead with open water; hold each of the two closing boat shots for three seconds.
// Exclude original brand titles and hull branding.
let asset = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
let composition = AVMutableComposition()
var cursor = CMTime.zero
let shots: [(start: Double, end: Double, duration: Double)] = [
    (6.8, 9.75, 2.95),
    (14.1, 14.7, 0.6),
    (14.8, 16.05, 3.0),
    (16.2, 18.5, 3.0),
]
for shot in shots {
    let start = CMTime(seconds: shot.start, preferredTimescale: 600)
    let end = CMTime(seconds: shot.end, preferredTimescale: 600)
    let range = CMTimeRange(start: start, end: end)
    let duration = CMTime(seconds: shot.duration, preferredTimescale: 600)
    try composition.insertTimeRange(range, of: asset, at: cursor)
    composition.scaleTimeRange(CMTimeRange(start: cursor, duration: range.duration), toDuration: duration)
    cursor = CMTimeAdd(cursor, duration)
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
