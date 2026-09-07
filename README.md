# Deenomics — marketing site

Next.js 16 (App Router, Turbopack) + Tailwind v4. One long landing page, plus
`/privacy` and `/terms`. Everything is statically prerendered.

```bash
npm run dev      # http://localhost:3000
npm run screens  # regenerate public/screens from assets/screenshots
npm run build    # runs `screens` first via prebuild
npm run lint
```

The site is **light-only** and has no WebGL, no theme toggle, and no
dependencies beyond Next and React. If you are looking for the scroll-driven
3D phone described in older notes, it was removed — see
[HANDOFF.md](HANDOFF.md).

**Product imagery is deliberately scarce: six pieces on the whole page.** Before
adding a seventh, read §5 of [HANDOFF.md](HANDOFF.md) — the count is a design
decision, not an oversight.

## Layout of the source

| Path | What lives there |
| --- | --- |
| `src/content/` | **All copy**, as typed data. No JSX. |
| `src/components/ui/` | The six primitives every section is built from |
| `src/components/sections/` | One file per band on the page |
| `src/app/page.tsx` | The running order, and only that |
| `src/lib/` | Brand tokens, and the `/plans` catalogue merge |
| `scripts/process-screenshots.mjs` | Raw captures → optimised WebP |

### Changing the brand name

`app.name` in [`src/lib/brand.ts`](src/lib/brand.ts) is the only place it
exists; everything else reads it. `app.meaning` holds "Deen + Economics", shown
in the hero and the footer. The store identifiers next to them are *not* the
brand — see §3 of [HANDOFF.md](HANDOFF.md) before touching those.

### Changing copy

Edit the matching file in `src/content/`. Nothing user-visible is written
inline in a component, so a wording change never means reading JSX. This is
also what would make a Bangla version a content addition rather than a
rewrite.

### Adding a section

1. Add its copy to `src/content/<name>.ts`.
2. Build the section in `src/components/sections/<Name>.tsx` using `Section`,
   `SectionHeading` and the other primitives.
3. Mount it in `src/app/page.tsx`.

**Give it `divider` and leave it on the default ground.** Sections are
separated by a hairline rule and whitespace, not by a colour change. Only two
leave the common ground — Zakat (`white`) and the AI coach (`dark`) — and that
is what makes those two register. Adding a third costs the other two their
effect.

**Then give it a form its neighbours do not have.** Because the palette is
constant, shape is the only thing distinguishing one band from the next, and a
run of sections built the same way stops reading as separate sections at all —
which is exactly what happened here and had to be undone. Setup is a track,
Guidance is an index, FeatureGrid is the ruled grid. See §2 of
[HANDOFF.md](HANDOFF.md) before reaching for a fourth ruled grid.

## Screenshots

Raw captures live in `assets/screenshots/` (committed). `npm run screens`
crops and re-encodes them into `public/screens/`, and `prebuild` runs it on
every build so a bundle can never ship images older than their sources.

To add one:

1. Drop the file in `assets/screenshots/`.
2. Add a row to `FILES` in
   [`scripts/process-screenshots.mjs`](scripts/process-screenshots.mjs):
   `[source, output, cropTop, maxHeight]`.
3. Run `npm run screens` and note the `WxH` it prints.
4. Add an entry to `SHOTS` in [`src/content/shots.ts`](src/content/shots.ts)
   with **those exact dimensions**.

Step 4 matters: `next/image` reserves space from the declared width and
height, so a wrong number means the page shifts as images load.

Every primary screen is cropped to a single device viewport (`maxHeight: 844`,
or `1266` for the 1.5x-scale Home capture). The site lays screenshots out
flat, so a tall scroll-capture would either squash or need its own scroll
container.

The pipeline generates **only the five images the page renders**. Raw sources
for every other screen stay committed in `assets/screenshots/`, so bringing one
back is a pipeline row plus a `shots.ts` entry — but see the note above first.

## Pricing

The section renders `FALLBACK_TIERS` from
[`src/content/pricing.ts`](src/content/pricing.ts) immediately, then upgrades
to live numbers if `NEXT_PUBLIC_API_URL` is set and `GET /plans` answers. A
failed or absent API is not an error — the fallback simply stays. Keep those
values in sync by hand with the server's `src/config/plans.ts`.

**The card leads with BDT** (৳299/mo) and shows `≈ $2.45` underneath, because
BDT is the currency actually charged — the catalogue is fixed to BDT in v1.
`USD_DISPLAY_RATE` in [`src/lib/plans.ts`](src/lib/plans.ts) is a
hand-maintained approximation for the secondary line only; do not promote it
back to the headline figure.

## Environment

| Variable | Effect if unset |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Falls back to `https://deenomics.com` — a **guess**, never confirmed — for canonical URLs, OG tags and the sitemap |
| `NEXT_PUBLIC_API_URL` | Pricing shows the hardcoded fallback tiers |
