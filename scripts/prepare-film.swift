import Foundation
import AVFoundation

// Each source range stays inside one actual camera shot, held for three seconds.
// Omit the opening green-boat close-up (source 6.0–6.8 seconds) and former closing close-up.
// Exclude original brand titles and hull branding.
let asset = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
let composition = AVMutableComposition()
var cursor = CMTime.zero
let shots: [(start: Double, end: Double, duration: Double)] = [
    (7.0, 9.0, 3.0),
    (9.25, 10.55, 3.0),
    (14.1, 14.7, 3.0),
    (14.8, 16.0, 3.0),
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
