# swankey.boats

English-first marketing site for **HUANQI INNOVATION** (浣启创新) and the **HQ E498** electric jet bass boat.

Production domain: [swankey.boats](https://swankey.boats)

Copy, specifications, dealer flow and visual direction follow the HUANQI website design brief. Public pages do not invent performance numbers beyond that brief. Quote-level figures belong in the quotation and build sheet.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Deploy target: Vercel

## Scripts

```bash
npm install
npm run dev      # local server
npm run build    # production build (must succeed)
npm run start    # serve the production build
npm run lint
```

## Content map

| Route | Page | Primary CTA |
| --- | --- | --- |
| `/` | Home — 100svh hero, differentiation, product snapshot, dealer band, gallery teaser | Become a Dealer |
| `/product` | HQ E498 specs, standard config, options, deck layout, shallow/weed scenarios | Request Product Information |
| `/technology` | Electric jet, protected intake, GNSS / heading / current-hold, maintenance path | Talk to Engineering |
| `/gallery` | Labelled media slots for renders, details, drawings and video | Download Media Kit |
| `/dealers` | Non-exclusive Europe programme (France / Germany first) + application form | Apply to Become a Dealer |
| `/about` | Company credibility + contact | Contact HUANQI |
| `/contact` | Inquiry form (`?topic=product\|dealer\|engineering\|media\|oem\|other`) | Contact HUANQI |

Brand lines used on the site:

- Company: HUANQI INNOVATION develops electric fishing boats and integrated shallow-water boat systems.
- Brand slogan: Engineered for Shallow Water. Built for the Cast.
- Product slogan: Go Shallow. Hold Steady. Fish Further.
- Contact: zhongya789@gmail.com · Shenzhen, Guangdong, China

Structured content lives in `src/lib/content.ts` and `src/lib/site.ts`. Change copy there before touching layout.

## Placeholder media

There are no sample-boat photographs in this repository. Each frame is a labelled **media slot** (CSS/SVG lake and boat diagrams, not stock photos).

To replace a slot:

1. Export renders/photos/video using the brief’s shot list (dawn lake hero, 45° / side / plan, bow, console, jet intake, livewell, cutaway, station-keeping, service path, underway clips).
2. Place files under `public/media/` using the slot id as the filename, for example:
   - `public/media/hero-dawn.jpg`
   - `public/media/three-quarter.jpg`
   - `public/media/video-run.mp4`
3. Swap the SVG child inside the matching `MediaSlot` on Home, Product, Technology or Gallery for a Next.js `<Image>` or `<video>`. Keep the “Media slot” label until the asset is final.
4. When a packaged media kit exists, point the Gallery CTA at `/media/huanqi-hq-e498-media-kit.zip` instead of the mailto request.

Do not drop generic fishing-boat stock into these slots. The brief asks for model-accurate graphite hull, teal accent, wide decks, low console and hidden jet intake.

## Forms

Default behaviour is **client-side validation** plus `mailto:zhongya789@gmail.com` with an encoded subject and body. No API keys are committed.

To use [Formspree](https://formspree.io) or [Getform](https://getform.io) without changing page code:

1. Create a form endpoint in that service.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_FORM_ENDPOINT` to the full HTTPS action URL (Formspree `https://formspree.io/f/xxxx` or Getform `https://getform.io/f/xxxx`).
4. Allow JSON posts from `https://swankey.boats` (and the Vercel preview URL) in the provider settings.
5. Redeploy. Both dealer and contact forms will POST JSON (`type: dealer-application | contact`) and fall back to mailto if the endpoint errors.

Dealer required fields from the brief: company name, contact person, country/region, email, phone/WhatsApp, sales channels, target market, interested model (defaults to HQ E498), expected quantity range.

## SEO

- Per-page title, description, canonical, Open Graph and Twitter tags
- JSON-LD Organization / WebSite / Product
- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt`
- Generated Open Graph image at `/opengraph-image`

`metadataBase` is `https://swankey.boats`.

## Deploy on Vercel + custom domain

The repo is Vercel-ready (`vercel.json`, Next.js framework, no special server).

1. Import [this GitHub repository](https://github.com/clauxel/swankey-boats) in Vercel (Framework Preset: Next.js, Root Directory: `.`, Production branch: `main`).
2. Leave Build Command as `next build` / `npm run build`.
3. Add `NEXT_PUBLIC_FORM_ENDPOINT` only if you are wiring Formspree/Getform.
4. In Vercel → Project → Settings → Domains, add:
   - `swankey.boats`
   - `www.swankey.boats` (optional, redirect to apex)
5. At the domain registrar, create the records Vercel shows (usually `A` for apex to `76.76.21.21` and `CNAME` for `www` to `cname.vercel-dns.com`).
6. Wait for HTTPS. Confirm `/`, `/product`, `/dealers`, `/sitemap.xml` and `/robots.txt`.

Vercel CLI (optional):

```bash
npx vercel login
npx vercel        # preview
npx vercel --prod # production
```

This environment may not hold Vercel credentials. If CLI deploy is skipped, connecting the GitHub repo in the Vercel dashboard is the intended path.

## Visual system

Dark graphite / deep navy surfaces, teal/cyan accent (`#0f766e` / `#0891b2` range), Outfit + Source Sans 3, generous spacing. Mobile home hero stays immersive but is slightly under `100svh` so the next section peeks through; desktop hero is `100svh`.
