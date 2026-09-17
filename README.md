# swankey.boats

English-first marketing site for **HUANQI INNOVATION** (浣启创新) and the **HQ E498** electric jet bass boat.

Production domain: [swankey.boats](https://swankey.boats)

Copy, specifications, dealer flow and visual direction follow the HUANQI website design brief. Public pages do not invent performance numbers beyond that brief. Quote-level figures belong in the quotation and build sheet.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Static export (`output: "export"`) → Cloudflare Pages

## Scripts

```bash
npm install
npm run dev          # local Next.js server
npm run build        # static export to out/ (Cloudflare-compatible)
npm run pages:build  # alias for npm run build
npm run preview      # serve out/ with Wrangler Pages
npm run deploy       # build, then wrangler pages deploy
npm run lint
```

## Content map

| Route | Page | Primary CTA |
| --- | --- | --- |
| `/` | Home — photographic hero, craftsmanship grid, engineering cutaway, dealer band, gallery | Become a Dealer |
| `/product` | HQ E498 specs, standard config, options, deck layout, shallow/weed scenarios | Request Product Information |
| `/technology` | Electric jet, protected intake, GNSS / heading / current-hold, maintenance path | Talk to Engineering |
| `/gallery` | Lifestyle, detail and cutaway photography plus technical diagrams | Download Media Kit |
| `/dealers` | Non-exclusive Europe programme (France / Germany first) + application form | Apply to Become a Dealer |
| `/about` | Company credibility + contact | Contact HUANQI |
| `/contact` | Inquiry form (`?topic=product\|dealer\|engineering\|media\|oem\|other`) | Contact HUANQI |

Brand lines used on the site:

- Company: HUANQI INNOVATION develops electric fishing boats and integrated shallow-water boat systems.
- Brand slogan: Engineered for Shallow Water. Built for the Cast.
- Product slogan: Go Shallow. Hold Steady. Fish Further.
- Contact: zhongya789@gmail.com · Shenzhen, Guangdong, China

Structured content lives in `src/lib/content.ts` and `src/lib/site.ts`. Change copy there before touching layout.

## Visual system

Dark graphite surfaces (`#05080c`), white headings, cyan/teal accent (`#00C2D4`–`#22D3EE`) for CTAs, underlines and hull pinstripes. Outfit + Source Sans 3. Photography leads: full-bleed lifestyle hero, 2×2 craftsmanship grid, white-studio engineering cutaway. SVG diagrams remain as supplements on Technology and Gallery.

## Media assets

Public files live in `public/media/` and are catalogued in `src/lib/media.ts`.

| File | Role |
| --- | --- |
| `hero-lake.jpg` | Primary Home hero (full-bleed lake lifestyle) and inner-page banners |
| `detail-collage.jpg` | Exploded engineering still (deck / batteries / jet); same image as `cutaway-exploded.jpg` |
| `cutaway-exploded.jpg` | Technology / engineering exploded view |
| `feature-bow.jpg` | Bow and trolling area (crop of the lake hero) |
| `feature-console.jpg` | Low console (crop of the lake hero) |
| `feature-storage.jpg` | In-deck storage hatch |
| `feature-stern.jpg` | Stern / transom (crop of the lake hero) |
| `feature-stripe.jpg` | Graphite hull cyan pinstripe (crop of the lake hero) |

Images are compressed JPEGs served as static files (`next/image` with `images.unoptimized` for Cloudflare Pages export). Swap files in place to update photography without changing layout.

When a packaged media kit exists, point the Gallery CTA at `/media/huanqi-hq-e498-media-kit.zip` instead of the mailto request.

## Forms

Default behaviour is **client-side validation** plus `mailto:zhongya789@gmail.com` with an encoded subject and body. No API keys are committed. There is no Node server or Pages Function.

To use [Formspree](https://formspree.io) or [Getform](https://getform.io) without changing page code:

1. Create a form endpoint in that service.
2. Copy `.env.example` to `.env.local` for local builds, or set the variable at **build** time (static export inlines `NEXT_PUBLIC_*` values).
3. Set `NEXT_PUBLIC_FORM_ENDPOINT` to the full HTTPS action URL (Formspree `https://formspree.io/f/xxxx` or Getform `https://getform.io/f/xxxx`).
4. Allow JSON posts from `https://swankey.boats` (and the `*.pages.dev` preview URL) in the provider settings.
5. Rebuild and redeploy. Both dealer and contact forms will POST JSON (`type: dealer-application | contact`) and fall back to mailto if the endpoint errors.

Dealer required fields from the brief: company name, contact person, country/region, email, phone/WhatsApp, sales channels, target market, interested model (defaults to HQ E498), expected quantity range.

## SEO

- Per-page title, description, canonical, Open Graph and Twitter tags
- JSON-LD Organization / WebSite / Product
- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt`
- Generated Open Graph image at `/opengraph-image`

`metadataBase` is `https://swankey.boats`.

## Deploy on Cloudflare Pages

`npm run build` writes a fully static site to `out/` (`next.config.ts` sets `output: "export"`). Deploy that directory with Wrangler from your machine.

### One-liner

```bash
npm run build && npx wrangler pages deploy out --project-name=swankey-boats
```

Equivalent helpers (same project name and output dir come from `wrangler.jsonc`):

```bash
npx wrangler login
npm run deploy
```

First time: Wrangler will create the Pages project `swankey-boats` if it does not exist, then publish to `https://swankey-boats.pages.dev`.

Optional form endpoint at build time:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx npm run build
npx wrangler pages deploy out --project-name=swankey-boats
```

Confirm `/`, `/product`, `/dealers`, `/contact?topic=engineering`, `/sitemap.xml` and `/robots.txt` after deploy.

### Attach custom domain swankey.boats

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **swankey-boats** → **Custom domains**.
2. Add `swankey.boats`. Optionally add `www.swankey.boats` and redirect it to the apex (Rules → Redirect Rules, or the domain’s WWW redirect).
3. If the domain’s DNS is already on Cloudflare, the dashboard creates the record for you (apex CNAME flattening to `swankey-boats.pages.dev`).
4. If DNS is at another registrar, add the records Cloudflare shows — typically a CNAME for `www` to `swankey-boats.pages.dev`, and CNAME flattening / ALIAS / ANAME for the apex (or move nameservers to Cloudflare).
5. Wait for HTTPS (automatic Universal SSL). Then confirm `https://swankey.boats`.

Do not point the domain at Vercel. `vercel.json` is only a static-host fallback; Cloudflare Pages is the production target.
