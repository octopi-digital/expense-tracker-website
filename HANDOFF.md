# Islamic Expense Tracker marketing site — handoff

Context for picking this up in a fresh conversation. Read
[README.md](README.md) too — it covers day-to-day usage (adding screenshots,
regenerating the model). This file covers **why things are the way they are**,
what is unfinished, and what is waiting on the user.

Working directory: `c:\Jrfin\website`. The React Native app it markets is at
`c:\Jrfin\expense-tracker-app`.

---

## 1. What this is

A marketing site for **Islamic Expense Tracker**, a Bangladesh-focused personal finance app
(net worth, financial health score, goals, Zakat, AI coach, SMS
auto-detection). Brand: emerald `#106C31`, bright green `#19CC50`, gold
`#D7A225`, Urbanist. Tokens mirrored into [src/lib/brand.ts](src/lib/brand.ts)
from the app's `src/constants/theme.js`.

Stack: **Next.js 16.3.0** (App Router, Turbopack), Tailwind v4, React Three
Fiber + drei + three.

> ⚠️ `AGENTS.md` in this repo warns that this Next.js version has breaking
> changes vs. training data. Read `node_modules/next/dist/docs/` before writing
> framework code. One consequence already bit us: **`dynamic(..., {ssr:false})`
> only works when declared inside a Client Component**, which is why the canvas
> boundary lives in `PhoneShowcase`, not `page.tsx`.

---

## 2. The centrepiece: scroll-driven 3D phone

One pinned section covers **both** the hero and the product tour. They are not
two sections — the phone travels continuously from its hero pose into the tour
poses, which is only possible inside a single WebGL scene.

### Files

| File | Role |
| --- | --- |
| [src/lib/screens.ts](src/lib/screens.ts) | The script: hero pose + copy, per-beat pose/copy/screenshot. **Edit this to change the tour.** |
| [PhoneShowcase.tsx](src/components/showcase/PhoneShowcase.tsx) | Pinned section, scroll measurement, copy overlays, theme branches |
| [StageCanvas.tsx](src/components/showcase/StageCanvas.tsx) | The `<Canvas>`; split out purely so `ssr:false` works |
| [PhoneStage.tsx](src/components/showcase/PhoneStage.tsx) | Lights + Lightformer environment |
| [PhoneModel.tsx](src/components/showcase/PhoneModel.tsx) | Model load, material fixes, pose easing, **lens shift** |
| [ScreenSurface.tsx](src/components/showcase/ScreenSurface.tsx) | Custom shader drawing screenshots on the glass |
| [transitions.ts](src/components/showcase/transitions.ts) | The per-boundary signature moves and their easing |
| [scroll-progress.ts](src/components/showcase/scroll-progress.ts) | Position/segment/pan maths |
| [phone-metrics.ts](src/components/showcase/phone-metrics.ts) | **Measured** screen rectangle — do not eyeball these |

### Key decisions, and why

**Scroll progress is a ref, not state.** The scene reads it every frame in
`useFrame`. Only the copy is React state, and it changes once per beat. Do not
"simplify" this into state.

**Stops are `[HERO, ...SCREENS]`**, so `STOP_COUNT = SCREENS.length + 1` and the
section is that many viewports tall. Position 0 = hero, 1..N = beats.

**Motion on the glass is scrolling, never cross-fading.** Two mechanisms in the
shader: *pan* (window moves down a long capture) and *slide* (next screenshot
stacks beneath the current one and both push up). Which you get is **inferred**:
adjacent beats sharing a `src` form a "run" that pans continuously with no seam;
different `src` produces a slide. The user explicitly asked for this — they
disliked the original cross-fade.

**Beats are face-on at rest. `rotateY` and `rotateX` are 0 at every stop and
must stay that way.** The user found the earlier ±9° resting yaw uncomfortable
— "like I have to see the screen from the right side."

Rotation is therefore something that happens strictly *between* stops. Each
boundary carries its own signature move (`enter` on the beat, implemented in
`transitions.ts`), and every one resolves face-on. The user asked for exactly
this: a 360° spin out of the hero, and a *different* effect on every boundary
after it.

**Pacing is the thing they are most sensitive to here.** The first build of
this rushed each move — a steep-centred ease inside a 0.55-viewport window —
on the theory that hurrying through the unreadable part of a rotation was
worth it. The user's verdict was immediate and correct: *"the 360 degree effect
is so fast… it look like mobile just move… i dont feel any smoothness."* Two
things fixed it, and both should be preserved:

- `VIEWPORTS_PER_STOP` (1.6) gives every stop more than one screen of scroll,
  so a move owns ~0.8 of a viewport instead of half of one.
- `glide()` holds a near-constant rate (peak 1.20× average, where the old curve
  peaked at 1.875×) so angular velocity does not spike mid-turn.

They also caught the overlap: the content pan used to still be running when the
phone started moving, so a screen was yanked away mid-scroll. `READ_UNTIL`
now splits each segment — **read first, move second**, never both.

**The tour runs at its own pace, not the scrollbar's.** The user asked for this
directly: *"no matter how much i scroll fast, effect will remain there natural
speed."* `PhoneShowcase` damps progress toward the measured scroll position and
caps the rate at `STOPS_PER_SECOND` (0.7), so a flick cannot fast-forward a
move.

Two things about this are load-bearing:

- **It damps progress, never the pose.** Pose damping lets a rotation take the
  short way round, and the 360° roll then never happens at all — the phone
  eases toward a target that has already come back to where it started. This is
  the same trap as the `lerp`-on-rotation bug above, in a different costume.
- **The copy follows the damped value**, not the raw scroll, or a heading
  appears for a screen still several hundred degrees away.

⚠️ **Known trade-off, not yet judged by the user:** flick the *entire* 9.6
viewport section past in one gesture and the phone needs ~7 s to finish, by
which point the sticky container has released and the section has scrolled
away — so the tour plays to an empty room and the reader misses it. Realistic
scrolling never does this, but if it proves a problem the fix is a ceiling on
how far progress may trail (say 1.2 stops), which preserves natural speed
*within* a transition while stopping the phone falling arbitrarily far behind.

**The barrel roll is two phases, and must stay that way.** It stands the phone
upright first (`STAND_UP`, 42% of the move), *then* turns it. Blending the
un-reclining and the turn together — the obvious one-curve implementation —
resolves yaw, recline and roll simultaneously, and the phone tumbles through a
diagonal about no particular axis. The user spotted this immediately and asked
for the standing-up to finish first. It is also why the hero segment skips its
reading phase (`stopSegmentAt`): with nothing to pan there, handing the whole
1.6 viewports to the move is what lets both phases breathe (0.67vh standing,
0.93vh spinning).

Two traps were hit building this, both worth knowing:

- **Do not `lerp` rotation toward the transition's output.** The curves are
  already eased, so a per-frame follow is not a smoother, it is a lag — and on
  a 360° roll it is destructive, because the target sweeps a full turn while
  the follow covers a fraction of it and the spin silently never happens. Worse,
  how much is lost depends on frame rate. Rotation, scale and lens shift are
  now driven straight from scroll.
- **Depth and `scale` are two dials on the same apparent size.** The camera is
  only 7.2 units out and one phone-height is ~2.6, so a depth offset that looks
  modest as a number moves the phone a third of the way to the lens. The first
  push-back spent both hard and shrank the phone to a third of its size.

**Horizontal composition uses a lens shift, not world movement.**
`PhoneModel` keeps the phone at `x = 0` and calls `camera.setViewOffset()`. This
matters: under a 30° lens, parking the phone half a half-width right puts it
~12° off the optical axis, and *perspective alone* turns it away from the viewer
regardless of its rotation. Shifting the frustum keeps it dead-on. `offsetX` in
a pose is a lens-shift fraction, not a position.

**The hero pose** is reclined onto its back (`rotateX: -62`, negative = screen
faces **up**), rolled so the charging port points **left** (`rotateZ: -85`), and
floats on a slow bob. The user iterated hard on this — do not change it casually.

---

## 3. The model

`public/models/phone.glb` (375 KB) is generated from a 33 MB Sketchfab source at
`assets/phone-raw.glb`, which is **gitignored — the user must keep their own
copy.**

```bash
node scripts/optimize-model.mjs      # raw -> public/models/phone.glb
```

Nearly all the weight was textures (three 4096² PNGs); geometry is only ~280 KB,
so it is left uncompressed rather than shipping a Draco decoder. The script
re-encodes textures by hand because `gltf-transform optimize --texture-compress`
**fails** on these files — Sketchfab exported them without a declared colour
space and sharp errors with `colourspace: parameter space not set`. The fix is
forcing `.toColourspace('srgb')` before WebP encode.

If the model is ever replaced, re-run `node scripts/find-screen-rect.mjs` and
paste its output into `phone-metrics.ts`. It finds the screen by clustering the
mesh's triangles by normal and taking the largest front-facing plane — the
screen mesh is not flat, so a bounding box is wrong.

---

## 4. ⚠️ The verification harness lies unless you let it settle

`scripts/capture-beats.mjs` drives headless Chromium through the section and
writes a PNG per beat. **It requires the dev server running.**

```bash
npm run dev
node scripts/capture-beats.mjs .captures 6
```

It originally waited a fixed 1400 ms after each scroll. That produced
**silently wrong screenshots**: the phone eases toward its pose at a fixed
fraction *per frame*, and headless Chromium renders WebGL through SwiftShader on
the CPU at a few FPS. Live values showed target `rotateX 0, rotateY 0` while the
*applied* rotation was still `x -19°, y -8°, z -26°` — mostly leftover hero pose.
Several screenshots shown to the user were partly stale, and a diagnosis was
built on them.

It now polls until two consecutive frames are byte-identical (`settle()`).

`settle()` has now been run and behaves as predicted: beats reach two identical
frames in **2–3 polls**, while any sample inside the hero's idle bob burns all
60 and warns. That warning is expected, not a failure — but it costs ~15 s per
hero sample, which is most of the runtime. Freezing the bob for captures is
still the obvious improvement.

**A second way this harness lies, learned the hard way:** do not edit anything
under `src/` while a capture is running. Turbopack hot-reloads mid-run, the
React tree remounts, `progressRef` resets to 0 while the page stays scrolled,
and you get frames showing the hero copy with no phone at beat 6. They look
like real bugs and they are not. The tell is a frame whose copy and pose
disagree. Let the run finish, *then* edit.

---

## 5. Current state

Verified by the user in a browser (earlier sessions):

- Hero: reclined, screen up, port left, floating
- Light/dark theme system (`useTheme`, `POSE_TRACK_LIGHT`, a light "ledger"
  composition in `PhoneShowcase`)

Built but **not yet confirmed by the user on a real browser** — `tsc` and
`npm run build` pass, and headless captures look right, but nobody has scrolled
it:

- **Real screenshots throughout.** The placeholder crops are gone; every beat
  has its own capture, processed by `scripts/process-screenshots.mjs` from the
  user's raw folder at `assets/screenshots/` (gitignored working material, not
  shipped).
- **Five beats**, alternating sides down the page: Home (right), Transactions
  (left), Financial health (**centre**, with `flank` stats down the other
  side), Zakat (right), Gold rate (left).
- **A different signature move on every boundary** — see §2.

**Placeholder / throwaway:**

- Everything below the tour is a stub. No nav, feature grid, pricing, FAQ, or
  footer yet.

**Known rough edge:** the gold-rate capture is a `frame` beat whose source had
the phone's own status bar and a stray WhatsApp notification baked in; that is
cropped off in `process-screenshots.mjs` (`cropTop`), not in the source file.

---

## 6. Agreed page structure

The 3D tour cannot carry a dozen beats — each costs a full viewport of scroll
and the WebGL section is expensive on mobile. Agreed shape:

1. **3D phone tour — 5 beats.** ✅ Built: Home/net worth, Transactions,
   Financial health, Zakat, Gold rate. AI Coach joins as a sixth when the
   recording lands. If the section then feels too long, **Gold Rate is the one
   to demote** into the feature grid — it is the least essential of the five.
2. **Feature grid — everything else.** Static CSS phone frames, no WebGL:
   Islamic guides, security/PIN, profile, currency rate, analysis, goals.
   Ordinary single-screen shots are fine here.
3. **Pricing — HTML cards, never screenshots.** Must be readable, indexable, and
   have working CTAs; a screenshot of a paywall goes stale and converts badly.
4. **FAQ + footer** — support links, privacy policy, store badges.

---

## 7. Waiting on the user

**Screenshots — largely delivered.** `assets/screenshots/` now holds real
captures with realistic demo data (Karim Ahmed, ৳40,23,000 net worth, 32/100
Improving), covering Home, Transactions, Financial health, Zakat, gold rate,
currency, Goals, Profile, Islamic guides, Secret Vault, and the add-income /
add-expense flows. The `Test` account name and ৳0 income problem is resolved.

Still outstanding:

1. **AI Coach — the one real gap.** The user is recording it, along with the AI
   voice call. It is the most distinctive feature and a still cannot sell it, so
   a 5–10s screen recording is worth more than a screenshot. Not currently in
   the tour; slot it in as its own beat when it lands, which will need a sixth
   `enter` effect choosing.
2. A **high-res logo** — wanted for the phone's back (see below), not just the
   site chrome.

**Decided since:** the app is **Android-only**, so the generic Android
quad-camera model is correct and stays. The user has *not* yet decided whether
to brand the phone's back. Worth knowing: the body texture is a near-flat dark
slab whose only detail is the camera cluster and a speaker grille, and the
barrel roll off the hero is the one moment it is on screen. Branding it in
emerald with the gold mark would turn that moment into the thing people
screenshot; leaving it plain is not broken, just anonymous.

An older note, now **resolved** — kept only so it is not re-raised: the first
sample showed Income ৳0 / Savings ৳-1,970 under an account named "Test". The
replacement captures fixed both.

**Also outstanding:**

- App Store / Play Store links, or confirmation to show "Coming soon" (Play
  Store only — the app is Android-only)
- Pricing tiers **as text** (names, prices, what is in each)
- Whether the site should have a **Bangla version** (the app is Bangla-first;
  this has been asked three times and still not answered)
- High-res logo, or confirmation to use `expense-tracker-app/src/assets/icon.png`

---

## 8. Working style

The user is **cost-sensitive** and prefers incremental work — do not fan out
parallel subagents. They iterate rapidly and precisely on visual details, often
correcting direction (left/right, up/down) across several short messages. When
they describe a visual problem, **verify against a real render rather than
reasoning about the maths** — the one time that was skipped, the diagnosis was
wrong. Equally, check the harness is telling the truth before trusting it.
