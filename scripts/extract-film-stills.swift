import Foundation
import AVFoundation
import AppKit
let source = CommandLine.arguments[1]
let output = CommandLine.arguments[2]
let asset = AVURLAsset(url: URL(fileURLWithPath: source))
let duration = CMTimeGetSeconds(asset.duration)
print("duration: \(duration)")
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero
generator.maximumSize = CGSize(width: 1920, height: 1080)
for (name, second) in [("film-poster", 8.0), ("lake-run", 15.0), ("fishing", 14.0), ("waterline", 9.5), ("deck", 15.8), ("horizon", 10.0)] {
 let time = CMTime(seconds: min(second, duration * 0.9), preferredTimescale: 600)
 let cg = try generator.copyCGImage(at: time, actualTime: nil)
 let bitmap = NSBitmapImageRep(cgImage: cg)
 let data = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.9])!
 try data.write(to: URL(fileURLWithPath: output + "/" + name + ".jpg"))
 print(name)
}
