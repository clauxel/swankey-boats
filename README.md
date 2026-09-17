# Swankey

Swankey's boat catalogue and dealer enquiry website, built with Next.js, TypeScript and Tailwind CSS.

Live site: [Swankey Boats](https://swankey.boats/).

## Development

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

The static export is written to `out/`. Wrangler previews the same static assets used in production. Builds use Webpack and system fonts, without a build-time font service dependency.

## Pages

- Home: full-screen boating film, product carousel, rotating E498 highlights and editorial links.
- E498: product design rendering, specifications, configuration options and deck layout.
- Technology: integrated propulsion, positioning and service diagrams.
- On the water: film, photography and E498 design.
- Dealers, About and Contact: company information and enquiry forms.

Content is maintained in `src/lib/content.ts` and `src/lib/site.ts`.

## Visual identity and media

The visual identity combines navy backgrounds, marine blue accents and an original circular horizon/wave emblem. Motion includes horizontal card scrolling, highlight crossfades, image hover effects and a compact sticky header. Reduced-motion preferences are respected; automatic video and highlights have pause controls.

Logo files are in `public/brand/`. Film, stills and the E498 design illustration are in `public/media/`; see `docs/media.md` for asset provenance. The E498 illustration is a design rendering; final configuration is confirmed in the build sheet. Product diagrams remain schematic.

### OpenRouter video production

The local media-production CLI uses OpenRouter's asynchronous video API. It reads `OPENROUTER_API_KEY` from the environment or the configured macOS Keychain entry; the marketing site never receives the key. Generation is a paid operation, separate from deployment.

```sh
npm run video -- models .release/video-models.json
npm run video -- submit .release/request.json .release/job.json
npm run video -- status .release/job.json
npm run video -- download .release/job.json .release/generated.mp4
npm run video:test
```

Build the request using the [OpenRouter video API](https://openrouter.ai/docs/guides/overview/multimodal/video-generation) and the current model catalog. Video edits use `input_references` with `video_url` and `image_url` entries. Do not combine these with `frame_images`, which would override the references. Job records prevent accidental repeat submissions; resume an existing job with `status`. An unconfirmed submission must be reconciled before another paid request. Review the downloaded film before promoting it to public media.

For Seedance requests with video input, include both input and output duration in the token estimate: `(input seconds + output seconds) × output width × output height × 24 / 1024`, multiplied by the model's current video-input token rate. Confirm the reported usage after generation. Model-specific editing requirements can differ from ordinary generation parameters even when a request passes OpenRouter's catalog validation.

## Enquiry forms

Forms validate required fields and open an addressed email draft by default. They do not claim that a message has been sent. An optional `NEXT_PUBLIC_FORM_ENDPOINT` HTTPS endpoint can accept JSON submissions. The variable must be supplied at build time; no secrets belong in public environment variables.

## Deployment

Production uses the existing Cloudflare Worker `swankey-boats` and `wrangler.worker.jsonc` to serve static assets. A small media handler provides byte-range responses so browser video controls can seek immediately. The legacy Pages configuration is retained for compatibility.

```sh
npm run deploy -- --dry-run
npm run deploy
```

The release script checks the existing Worker and its bindings, saves previous deployment IDs locally, runs domain tests, lint and a production build, then deploys while preserving variables. It verifies the live site after deployment and submits the current sitemap to IndexNow. It accepts `CLOUDFLARE_API_KEY`, `CLOUDFLARE_EMAIL` and optional `CLOUDFLARE_ACCOUNT_ID` from the environment; on macOS it can read the corresponding existing Keychain entries. It never writes credentials to disk.

Per-page metadata, structured data, robots and sitemap remain available. The canonical URL comes from `site.config.json` and defaults to `https://swankey.boats`; `NEXT_PUBLIC_SITE_URL` can override it for isolated builds. The `www` hostname redirects to the canonical domain, preserving paths and query strings.

The IndexNow verification value in `site.config.json` and its matching public text file are intentionally public ownership proofs, not secret API credentials.
