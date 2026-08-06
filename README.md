# Jrfin marketing site

Next.js 16 + Tailwind. The centrepiece is a scroll-driven 3D phone: a real
three.js model that floats at a 3/4 angle in the hero, straightens up as you
scroll, and scrolls app screenshots on its screen.

The hero and the product tour are deliberately **one** pinned section. The
phone has to travel continuously from its hero pose into the tour poses, and
that is only possible if a single WebGL scene spans both.

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Adding a screenshot

1. Drop the image in `public/screens/`. Full device resolution, portrait.
2. Add an entry to `SCREENS` in [`src/lib/screens.ts`](src/lib/screens.ts).

That is the whole process — the section's scroll height, the copy rail, and the
progress dots are all derived from that array, so adding a beat needs no other
change.

Set `aspect` to the image's true `width / height` — the shader uses it for
cover-fit and will crop wrongly if it is off.

### How motion on the glass works

The screen **scrolls**; it never cross-fades. Two behaviours combine:

- **Pan** moves the visible window down a single long capture, so the app's own
  content scrolls as the page scrolls. Requires `fit: 'scroll'`.
- **Slide** stacks the next screenshot directly beneath the current one and
  pushes both upward, so changing screenshot reads as more scrolling rather
  than a dissolve.

| `fit` | Use for | Behaviour |
| --- | --- | --- |
| `frame` | A normal single-viewport capture | Covers the screen, centred, and holds still |
| `scroll` | A long scroll-capture, taller than one viewport | Starts at the image's **top** on arrival and pans down as you scroll on |

Beats sharing one `src` are treated as a single **run** and pan continuously
across it — top of the image at the run's first beat, bottom at its last, no
seam or restart. Each beat currently has its own screenshot, so every run is
one beat long.

A `scroll` beat pins to the top of its image on arrival because each beat's
headline describes what is at the *top* of that screen. An earlier version
centred the window instead, which parked "Net worth, live" on the middle of the
home capture with the net worth figure scrolled out of frame.

### How the phone moves between beats

Each boundary has its own signature move, declared per beat as `enter`. They
deliberately use different degrees of freedom so they read as different *kinds*
of motion rather than different amounts of one — see
[`transitions.ts`](src/components/showcase/transitions.ts).

| Effect | Mechanism | Screenshot swap |
| --- | --- | --- |
| `barrel-roll` | Stands the phone upright, *then* a full 360° yaw — the only move that shows the phone's back | Hard cut while reversed |
| `hand-off` | Pure lateral travel, no rotation at all | Slide |
| `push-back` | Recedes into depth and returns | Hard cut at the far point |
| `pendulum` | In-plane `rotateZ` swing; screen stays readable | Slide |
| `card-turn` | Yaws to a 90° sliver and back | Hard cut while edge-on |

Two rules hold across all of them:

- **Every effect starts and ends face-on.** Resting poses never carry yaw — an
  earlier tour left a few degrees on each beat and it read as being made to
  view the screen from off to one side.
- **A move gets a runway and travels it at an even rate.** Each stop is worth
  `VIEWPORTS_PER_STOP` (1.6) viewports, spent reading first and moving second,
  so the move owns ~0.8 of a viewport to itself and holds near-constant speed
  across it.

That second rule replaced its own opposite. The eases used to be *steeper* in
the centre, to hurry through the unreadable part of a rotation — but at any
real scrolling pace that stopped the 360° roll reading as a rotation at all
and turned it into a jump. Room, not speed.

### The tour runs at its own pace

Progress **trails the scrollbar** rather than being pinned to it, capped at
`STOPS_PER_SECOND` (0.7). However fast the page is flicked, the phone still
stands up, turns its full circle and settles at that rate — the scrollbar
arrives early and the performance finishes on its own time.

At reading pace the gap stays small, the exponential `APPROACH` term dominates,
and the phone tracks the scrollbar closely enough to feel directly connected
(~0.03 stops behind). The rate cap only takes over once someone flicks.

Crucially it is **progress** that is damped, never the pose. Damping the pose
lets a rotation take the short way round, and a 360° roll then simply never
happens — the phone eases toward a target that has already returned to where it
started. Progress is one-dimensional and monotonic, so easing it makes the
phone walk every step of the authored path no matter how violently someone
scrolls.

The copy follows the damped value too, so a heading never appears for a screen
that is not on the glass yet.

### Timing within a segment

```
 0 ───────────── READ_UNTIL (0.5) ──────────────── 1
 │  phone parked, screenshot pans │  phone moves   │
```

The two phases never overlap, and that is deliberate: when they did, the phone
began its move while the screenshot was still scrolling, so a screen was pulled
away before it had finished showing itself and the transition read as an
interruption rather than a hand-over.

When a move hides the glass, the screenshot is swapped behind it as a hard cut
and the phone returns already showing the next screen. When the glass stays
readable, the swap falls back to the slide.

Under `prefers-reduced-motion` the signature move is dropped entirely rather
than scaled down — the content still scrolls, but the phone does not perform.

## The phone model

`public/models/phone.glb` is the web-ready model (375 KB). It is generated from
the 33 MB Sketchfab source, which lives at `assets/phone-raw.glb` and is
**gitignored** — keep a copy somewhere durable, it is not in this repo.

```bash
node scripts/optimize-model.mjs    # assets/phone-raw.glb -> public/models/phone.glb
```

Nearly all the weight is textures; the geometry is only ~280 KB. The script
resizes and re-encodes each texture to WebP, forcing sRGB first because
gltf-transform's built-in `optimize` fails on these particular PNGs (Sketchfab
exports them with no declared colour space).

### If you replace the model

The screenshot plane is positioned from measured numbers, not guesses. Re-run
the probe and paste its output into
[`src/components/showcase/phone-metrics.ts`](src/components/showcase/phone-metrics.ts):

```bash
node scripts/find-screen-rect.mjs   # reports the screen quad in world space
```

## Checking the render

`scripts/capture-beats.mjs` drives a headless browser through the section and
writes a PNG per beat, so 3D framing can be reviewed without scrolling by hand.
Requires the dev server to be running, and `playwright` installed.

```bash
node scripts/capture-beats.mjs .captures
```

## Processing real screenshots

`scripts/process-screenshots.mjs` converts raw device captures from
`assets/screenshots/` (not shipped — the user's own working folder) into
optimized WebP files under `public/screens/`, and is the only place resizing
or cropping (e.g. trimming a stray status bar) happens. Add a new screenshot
there, then reference the output path from `SCREENS` in `src/lib/screens.ts`.

```bash
node scripts/process-screenshots.mjs
```
