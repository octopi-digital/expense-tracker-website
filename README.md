# Deenomics — marketing website

The public site for **Deenomics** (Deen + Economics), the Islamic wealth and
expense tracker app. Built fresh; it shares nothing with the empty
`expense-tracker-website/` folder next to it.

## Stack

- **Next.js 16** (App Router, Turbopack) — every page is statically prerendered
- **Tailwind CSS 4** — tokens declared in `src/app/globals.css` under `@theme`
- **TypeScript**, no other runtime dependencies

## Run it

```bash
npm install
npm run dev        # http://localhost:3010
npm run build      # production build
npm start          # serve the build on :3010
npm run typecheck
```

## Pages

| Route | What it is |
|---|---|
| `/` | Landing page — hero, features, Zakat and AI spotlights, pricing, FAQ |
| `/features` | Deep dive on all six product pillars |
| `/zakat` | Zakat story **plus a working Nisab/Zakat calculator** |
| `/pricing` | Free vs Premium, with a full comparison table |
| `/download` | Store links, device requirements, and every permission explained |
| `/support` | Support channels, full FAQ, contact form |
| `/privacy`, `/terms`, `/data-deletion` | The legal pages Google Play requires |

`robots.txt` and `sitemap.xml` are generated from `src/app/robots.ts` and
`src/app/sitemap.ts`.

## Where the content lives

Almost all marketing copy is data, not JSX, in **`src/lib/site.ts`** — site
name, URL, support email, store links, the six features, pricing plans, the
comparison table, FAQs, and the hero stats. Editing that file updates every
page that uses it, and keeps the copy in one place for a future translation
pass.

## Brand

Colours are lifted verbatim from the app's own source of truth,
`expense-tracker-app/src/constants/theme.js` (emerald `#106C31`, green
`#19CC50`, gold `#D7A225` / `#FADB8A`, ink `#0F172A`), and redeclared as
Tailwind tokens in `globals.css`. If the app's palette changes, change it
there too so the two stay in step.

The app screens shown in the phone mockups are **built in HTML/CSS**
(`src/components/PhoneMockup.tsx`), not screenshots — so they stay sharp at
any size and never go stale. Swap in real screenshots later if you prefer.

## Before you go live

1. **`src/lib/site.ts`** — set the real `url`, `email`, `playStoreUrl` and
   `appStoreUrl` (the store links are `#` placeholders today).
2. **Legal pages** — `/privacy`, `/terms` and `/data-deletion` are written
   around how the product actually behaves, but each ends with a note listing
   what still needs filling in (registered company name, jurisdiction) and
   should be reviewed by a lawyer for your markets.
3. **Pricing — read this before launch.** Only two of the six tiers exist in
   the backend. `expense-tracker-server/src/config/plans.ts` defines `free`
   (5 AI conversations/month, 3 goals) and `premium` (৳299/month, ৳2,999/year)
   and enforces those limits in code. **Basic, Family, Business and Lifetime
   are marketing-only right now** — nobody can buy one until they are added to
   `PLANS` there, given store products, and their limits enforced. Either ship
   the backend tiers first or hide those cards. Prices live in `plans` /
   `extraPlans` in `src/lib/site.ts`; keep them in step with `plans.ts` by
   hand, since a static site cannot import from the Express app.
4. **Contact form** — `src/components/ContactForm.tsx` composes a `mailto:`
   rather than posting anywhere, since there is no backend. Point its submit
   handler at an API route when one exists.
5. **Metal rates** — the Zakat calculator ships with editable per-gram
   defaults for gold and silver. They are illustrative; the app itself uses
   live rates.

## Deploying (matching the existing ExpenseTracker setup)

Same shape as `expense-tracker-admin` — build on the server, run under PM2
behind Nginx:

```bash
npm ci
npm run build
pm2 start npm --name deenomics-website -- start   # binds :3010
```

Then proxy your domain to `127.0.0.1:3010` in Nginx. Add the app to
`/var/www/ExpenseTracker/ecosystem.config.cjs` if you want it managed
alongside the others — remember `cwd` must be this directory.

Alternatively, since every route is static, `next build` output can be served
by any static host.
