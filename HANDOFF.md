# Deenomics marketing site — handoff

Why things are the way they are, what bit us, and what is still open. Read
[README.md](README.md) for day-to-day usage.

---

## 1. What happened here

The site has been rebuilt twice.

**First pass** replaced a dark-emerald page carrying a scroll-driven WebGL
phone, sticky-stacked section overlaps, a pointer glow, per-character magnify
on the `<h1>`, a starfield and pointer-tilt cards. Two things were wrong with
it, in the user's words: it **looked dated and not premium**, and its
**structure did not lead anywhere** — every "Get the app" button pointed at
`#download`, which was the *footer*, so a reader following a call to action
landed on the copyright line. Zakat, the one thing no competing tracker does,
had no section of its own.

**Second pass** followed [chroniclehq.com](https://chroniclehq.com) as an
explicit reference, and cut the screenshot count. What the first pass produced
was clean but still template-shaped: white ground, bold headings, a shadowed
card around everything, a colour-striped page, and eighteen phone screenshots.

Decisions, all explicitly confirmed:

| | |
| --- | --- |
| Reference | chroniclehq.com |
| Name | **Deenomics** (Deen + Economics), renamed from Islamic Expense Tracker |
| 3D phone and heavy scroll effects | **Dropped entirely** |
| Theme | **Light-only.** No toggle, no dual tokens |
| Copy | Kept and re-ordered, not rewritten |
| Languages | English only for now, but all copy lives in `src/content/` so Bangla is a content addition |

The client bundle contains no WebGL code at all — worth re-checking after any
dependency change:

```bash
grep -rl "WebGLRenderer\|react-three" .next/static/chunks   # expect nothing
```

Both earlier implementations are in git history if any of them is wanted back.

---

## 2. The five ideas the design runs on

### Display type is set at regular weight

`h1`/`h2`/`h3` are **400**, not 600 or 700. This is the single biggest thing
separating a considered marketing page from a template one: at 48px the size
is already carrying the emphasis, and adding weight on top only thickens the
page. Regular weight at a large size with tight negative tracking (-0.03em,
scaled down as the type gets smaller) is what reads as editorial. Chronicle
sets its 54px hero at weight 400; so does this.

### Sections are separated by rules, not by colour

The page holds one ground (`#f3f3f3`) and divides itself with hairlines and
whitespace. Only two sections leave it — Zakat is `white`, the AI coach is
`dark` — and that scarcity is exactly what makes those two land. An
alternating light/dark stripe down a long page reads as unrelated pages
stapled together.

The previous pass alternated `default` / `alt` on every section. It looked
fine and meant nothing.

### `Section` owns the palette, not the components

Each `tone` **locally redefines** `--ink`, `--border`, `--surface-card`,
`--accent` and `--accent-on`. Children just use `var(--ink)` and land the right
colour for whatever band they are in — which is why no component takes an
`inverted` prop, and why the same `<Button variant="primary">` is emerald on
the light ground and bright green on the dark one.

Two consequences worth knowing:

- **`--accent` is a role and gets reassigned. `--emerald` is the literal and
  never does.** A band that paints itself `bg-[var(--accent)]` while also
  setting `--accent` on the same element resolves against its own override.
  That is exactly what happened once: the emerald CTA band set
  `--accent: #ffffff` for its children and painted itself with
  `var(--accent)`, rendering a white section with white text.
- `--accent-on` (the text colour that goes *on* the accent) has to travel with
  the accent. White on emerald passes AA; white on the bright green is ~1.9:1
  and does not.

The greys carry **no colour cast**. An earlier version tinted every neutral
toward the brand green, which meant the emerald never read as an accent — it
was just the most saturated point on an already-green page.

### All copy is data

`src/content/` holds every user-visible string as typed objects, including the
screenshot registry with each capture's true pixel dimensions. Components
import and render; they never contain sentences. Icons are referenced by key
(`icon: 'analysis'`) and resolved to inline SVG inside the section, so content
stays translatable without touching markup.

### Colour stays constant, so *form* has to carry the variety

The corollary of the rule above, and it was missed the first time. Holding one
ground and separating with hairlines is right — but it was then applied so
uniformly that Zakat's points, AutoCapture's steps, the coach's points,
Guidance, the feature grid and Setup were all the same object: a hairline, a
15px title, 14px grey body, in a grid. Six of those in a row and no section
reads as its own; the page becomes one undifferentiated list and the eye stops
finding edges.

The fix is not colour — it is giving a section the form its content already
has:

| Section | Form | Because |
| --- | --- | --- |
| Setup | Five markers on a connecting track | It is the one genuinely *ordered* list on the page, so drawing the order is information, not ornament — and "five stops on a short path" is the claim the section makes |
| Guidance | A full-bleed contents index | Eight guides are a library's contents, and a contents page is the plainest way to say "there is a body of material here" |
| FeatureGrid | The ruled grid, unchanged | Something has to stay the baseline, and eleven unordered items genuinely are a grid |

**So: reach for a different form before a different colour.** A new section
still gets `divider` and the default ground (README's rule stands) — but if its
shape is identical to both neighbours', it will not register no matter how good
the copy is.

The other constraint that falls out of this: **Setup owns the mono step
numbers now.** AutoCapture uses them too, but those two are far apart and one
is a track while the other is a ruled list. A third numbered sequence would
make all three read as the same component.

---

## 3. The name

**Deenomics** — Deen + Economics. It is a portmanteau, so the page decodes it
twice: as a small line above the `<h1>`, and again under the footer wordmark
(`app.meaning` in `lib/brand.ts`). A coined word above the fold that a reader
cannot unpack is just an unfamiliar noun; unpacked, it is the positioning in
three words.

The rename touched almost nothing, because the name only ever existed in one
place — `app.name` in [`src/lib/brand.ts`](src/lib/brand.ts). Everything else
reads it. Keep it that way.

Two things deliberately **not** renamed:

- **`androidPackage` / `iosBundleId`** stay `com.islamicexpensetracker`. An
  Android `applicationId` is the app's permanent identity on Play — changing it
  does not rename a listing, it publishes a different app, and existing
  installs never receive an update. If those should change it has to happen in
  the app project, before its first release. The site mirrors whatever the app
  actually ships.
- **The logo.** `public/deenomics-icon.png` is the file renamed, not the
  artwork — it is still the app's own icon. A wordmark or mark drawn for the
  new name would be an improvement; nobody has supplied one.

`siteUrl`'s fallback moved to `https://deenomics.com`. It was and remains a
**guess** — the real origin belongs in `NEXT_PUBLIC_SITE_URL`, and the fallback
only exists so local builds don't crash.

---

## 4. Traps hit while building this

**A component must not bake in a `display` utility.** `Button` originally had
`inline-flex` in its base classes. The header's `hidden sm:inline-flex` then
lost — Tailwind cannot dedupe conflicting utilities, so the winner is whichever
lands later in the generated stylesheet, which the call site does not control.
The full-size CTA rendered at 390px and pushed the page 16px wide. `Button` now
takes `display={false}` when the caller owns it.

**The page was blank without JavaScript.** `Reveal` server-renders every
element as `data-reveal="out"` (opacity 0) and only flips it in a `useEffect`.
With JS off, all 114 revealed elements — the entire body of the page — stayed
invisible. Fixed by scoping the *hidden* state to `.js [data-reveal='out']`,
where the class is added to `<html>` by an inline script in `layout.tsx` before
first paint. Scoping the hidden state rather than the visible one is what
avoids a flash. That script is also why `<html>` needs
`suppressHydrationWarning`.

**Test it, it is easy to regress:**

```js
await browser.newContext({ javaScriptEnabled: false })
// expect 0 elements with computed opacity 0
```

**A screenshot of a phone is not a phone.** The "everything else" cards once
showed each device cropped to a 210px strip anchored to the card's bottom edge.
At that height a 390x844 capture shows one header and half a row, and it reads
as a broken image. A narrower device shown *complete* costs the same vertical
space and is legible.

---

## 5. The screenshot budget

**Six pieces of product imagery on the whole page**, down from eighteen:

| Section | What |
| --- | --- |
| Hero | Home / net worth |
| Features | Home, and the health score |
| Zakat | The Zakat breakdown |
| AutoCapture | The SMS inbox |
| AICoach | The voice-call clip (poster only until pressed) |

Everything else — guidance, the eleven-item feature list, the five setup steps,
the gold rate — is text. This is a rule, not an accident. When every section
carries a device, none of them mean anything and the page becomes a scroll
through a photo album of one app; the four screens above are load-bearing
precisely because they are the only ones.

Three specific images were cut for saying nothing their sentence had not
already said: the guides library (a device showing eight rows, next to the same
eight rows set as text), the gold-rate sheet (a whole screenshot to say "you
can set a rate"), and five near-identical onboarding form screens.

### How a screenshot is mounted, and where it is allowed to be cut

Every one sits on a `Plinth`. With `bleed` it drops its bottom padding, so a
device taller than the plinth is cut by the edge and reads as continuing below
the slab.

The slab is built from three layers under the content, and each is doing a job:

1. **A khatam motif** — the eight-pointed star of two squares overlaid at 45°,
   tiled at 5% of the ink colour and masked to fade out before it reaches the
   device (`.plinth-motif` in globals.css). The plinth is otherwise a plain
   grey rectangle with a phone in the middle, and the empty thirds either side
   had nothing to say. It is also the only place the *Deen* half of the name
   shows up visually. Keep it below legibility: the moment it reads as
   decoration it competes with the screenshot, which is why it is drawn in the
   neutral ink and not in the emerald or the gold.
2. **A light** from the top, so the slab reads as a surface.
3. **A floor** — a faint darkening toward the bottom, which gives the surface
   somewhere to recede to and the device's shadow something to fall onto.

**The device is the one thing on the site that carries a real shadow**
(`--shadow-device`). Cards separate by tone alone, deliberately — but a
screenshot with only a hairline sits in the same plane as the slab under it and
reads as a decal printed on the grey rather than an object resting on it.

**The cut is hard, and the crop heights are measured.** An earlier version
faded it with a scrim in the plinth's colour, on the theory that a soft edge
makes any crop point look intentional. On a photographic screen it does the
opposite: the home screenshot's landscape and the white card under it turned to
a grey smear with a ghost of the card floating in it — it looked like a
rendering fault. The scrim is gone.

A hard edge is only ugly when it bisects a distinct element. So the fix is not
to soften the cut but to *put it somewhere*. Every screenshot here is 9:19.5,
so at a shared render width they all crop at the same rendered y, and the safe
bands can be found once:

| Where | Plinth `max-h` | Rendered cut | Why there |
| --- | --- | --- | --- |
| Hero | 508px | 460 | Home's Income card ends ~446; the white gauge starts ~478 |
| Features | 400px | 352 | The score screen's alert card ends ~347; home's Income card starts ~366 |

Both are `48px top padding + cut`. **Re-measure before changing either.** These
were wrong twice from eyeballing: 344 looked clean and was four pixels inside
the alert card, because a large flat card is just as uniform as background. The
reliable test is the row's mean *colour* returning to the page background, not
its uniformity — there is a short script in the transcript, and
`sharp(file).raw()` plus a per-row mean is all it takes.

The devices are also deliberately **large** — 300px, cropped to roughly their
top half. A small whole device centred in a wide slab is the worst of both: half
the plinth is dead grey and the UI inside is too small to read, which defeats
the only reason to show a screenshot at all.

`src/content/shots.ts` and the pipeline manifest both hold **only the five
images that render**. A registry is not an archive: an entry nothing renders is
a `public/` file that ships for no reason. Raw captures for everything else are
still committed in `assets/screenshots/`.

---

## 6. ⚠️ The capture harness lies in two different ways

Both cost real time. Neither is a bug in the site.

**Fast programmatic scrolling skips reveals.** A tight `scrollTo` loop jumps
whole elements between two intersection samples, so `IntersectionObserver`
never fires and screenshots show empty sections. Measured: 400px steps at 40ms
revealed 10 of 114 elements; 300px steps at 220ms revealed all 114. Scroll at
human pace before capturing, and verify with a count:

```js
[...document.querySelectorAll('[data-reveal]')].filter(e => e.dataset.reveal === 'out').length
```

**Full-page screenshots duplicate content on very tall pages.** At 390px the
page is ~21,700px tall, and Chrome's stitched `fullPage` capture reproduced the
hero again two-thirds of the way down. The DOM was correct throughout — one
`<h1>`, eleven sections, verified by scrolling to the offset and taking a plain
viewport screenshot, which showed the right content. **If a full-page capture
shows something impossible, check a viewport capture at that scroll offset
before believing it.**

---

## 7. Open items

**Blocking nothing, but each is a real gap:**

1. **The Play Store URL is still unknown.** `STORE.url` in
   [`src/content/site.ts`](src/content/site.ts) is `null`, which renders
   "Coming soon on Google Play" as a non-link. Set it and every CTA on the page
   becomes a real link — no other change needed.

2. ~~**Pricing displays USD but charges BDT.**~~ **Resolved.** The card now
   leads with ৳299/mo and carries "≈ $2.45" underneath, so the headline figure
   is the one actually charged (catalogue currency is fixed to BDT in v1 —
   server `config/plans.ts`, `sslcommerz.gateway.ts`, IMPLEMENTATION-PLAN
   decision D6). `USD_DISPLAY_RATE` in `lib/plans.ts` is still a
   hand-maintained `1/122`; now that it is visibly an approximation, a stale
   rate is cosmetic drift rather than a wrong price.

3. **The sign-up copy may be wrong about Apple.** `SETUP_STEPS[0]` says "or
   continue with Google", and a comment records that the app ships Google
   sign-in only — but the raw capture
   (`assets/screenshots/new account/Sign Up.png`) shows a Google **and an
   Apple** button. The screenshot no longer ships, so nothing contradicts
   itself on screen any more, but the sentence is still making a claim that
   one of those two sources says is wrong. Not guessing which.

4. **Bangla.** The app is Bangla-first and ships four languages; the site is
   English only. Asked and deferred, not forgotten. `src/content/` is shaped
   so this is adding files, not reopening components.

5. **The AI coach clip is unused.** `public/video/ai-coach.mp4` (2.1 MB) ships
   but nothing references it — only `ai-voice-call.mp4` is used. The chat side
   of that section is deliberately text now, so this is very likely a delete;
   left in place because removing someone's media without being asked is not
   mine to do.

**Videos are click-to-play and must stay that way.** The two clips are 2.1 MB
and 4.0 MB. `VideoPlayer` does not mount the `<video>` element at all until the
poster is pressed, because `preload="none"` is only a hint and browsers ignore
it often enough to matter. Verify with:

```js
performance.getEntriesByType('resource').filter(r => r.name.endsWith('.mp4')).length  // expect 0
```

---

## 8. Working style

The user is **cost-sensitive** and prefers incremental work — do not fan out
parallel subagents. They iterate quickly and precisely on visual details.
When they describe a visual problem, **verify against a real render rather
than reasoning about it** — and per §4, check that the render itself is
telling the truth.
