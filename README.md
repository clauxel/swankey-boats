# Swankey

Swankey's boat catalogue and dealer enquiry website, built with Next.js, TypeScript and Tailwind CSS.

Live site: [Swankey Boats](https://swankey-boats.yangdengkui01.workers.dev/).

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

## Enquiry forms

Forms validate required fields and open an addressed email draft by default. They do not claim that a message has been sent. An optional `NEXT_PUBLIC_FORM_ENDPOINT` HTTPS endpoint can accept JSON submissions. The variable must be supplied at build time; no secrets belong in public environment variables.

## Deployment

Production uses the existing Cloudflare Worker `swankey-boats` and `wrangler.worker.jsonc` to serve static assets. A small media handler provides byte-range responses so browser video controls can seek immediately. The legacy Pages configuration is retained for compatibility.

```sh
npm run deploy -- --dry-run
npm run deploy
```

The release script checks the existing Worker and its bindings, saves previous deployment IDs locally, runs lint and a production build, then deploys while preserving variables. It accepts `CLOUDFLARE_API_KEY`, `CLOUDFLARE_EMAIL` and optional `CLOUDFLARE_ACCOUNT_ID` from the environment; on macOS it can read the corresponding existing Keychain entries. It never writes credentials to disk.

Per-page metadata, structured data, robots and sitemap remain available. The canonical URL defaults to the live Workers URL; `NEXT_PUBLIC_SITE_URL` can set an attached custom domain at build time.
