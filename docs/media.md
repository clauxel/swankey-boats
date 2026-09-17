# Media

- `swankey-water-film.mp4`: 9.55-second lake and aerial edit from the 35.864-second boating film used by the reference at http://www.kimpleboats.com.cn/; source path `/qfy-content/uploads/2024/06/733dd2a7b9140d67a54fa04c8b595659.mp4`. The closing overhead and water-level boat shots each last 3 seconds, using extended source sections and retimed playback.
- `film-poster.jpg`, `lake-run.jpg`, `fishing.jpg`, `waterline.jpg`, `deck.jpg`, `horizon.jpg`: still frames from that film, used for boating ambience. Frames with visible reference-brand marks are excluded. They are not E498 product-performance evidence.
- `e498-design.png`: generated Swankey electric bass-boat design illustration, with graphite hull and blue details. Final configuration is confirmed in the build sheet.
- `swankey-electric-jet-exploded.jpg`: complete owner-supplied 1672 × 941 exploded system illustration, preserved without cropping or retouching. The technology page explains eight component groups and the electrical/water paths; specific ratings are left to the build sheet. General waterjet principles were checked against HamiltonJet’s HJ Series designer manual, without implying a HamiltonJet component is fitted.

Brand assets are in `public/brand/`; the wave/horizon emblem and upright wordmark form an independent Swankey identity.

The curated edit is flattened with `scripts/encode-film.swift` to H.264/AAC after `scripts/prepare-film.swift`, avoiding MP4 edit-list duration differences across browsers.
