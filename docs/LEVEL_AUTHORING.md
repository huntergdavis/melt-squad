# Authoring a rescue call

Calls are registered in src/levels.ts. The original 20 entries serve as examples.
World packs' authored layouts live in `src/packs/NN.ts`; append new packs after
legacy content, keep their `NN.SS` IDs, and set `pack` to their world ID.
Add one Level with a stable id, title, short pitch, hint, ending, par time,
theme, starting nozzle settings, targets, and illustrated props. The board
and progression read that data directly. Each world contains twenty scenes;
the release marker and tests track the total playable count.

Pack JSON imports must include `with { type: "json" }`, as in `src/packs/03.ts`.
Vite and the Node-based browser-test runner both load these modules. Check
`npx playwright test --list` before starting a release build to catch import errors early.

For a finished-art check, start `npm run dev -- --port 4178`, then run
`node scripts/inspect-scenes.mjs 07.05 07.16 07.20` with the desired scene IDs.
This optional local tool solves via emitted water and real physical signals,
then captures the completed canvas under ignored `scratch/`. Inspect it for
faces hidden by completed constructions, readable poses, and faithful payoffs.

World coordinates are 960 × 580. Target tops must be reachable by the nozzle
(currently y >= 120); leave space above each for a downward stream.
The nozzle moves between x 55–905 and y 72–515. Q/E or shoulder buttons tilt it.

## Five verbs

| Verb   | Condition                             | Result                                                          |
| ------ | ------------------------------------- | --------------------------------------------------------------- |
| melt   | Temperature >= 10°                    | Erodes a 10-pixel ice grid locally; droplets pass through holes |
| freeze | Temperature <= −10°                   | Grows a visible structure inside its dotted outline             |
| warm   | Target temperature and pressure range | Gently increases warmth; wrong settings reverse progress        |
| fill   | Temperature > 0°                      | Collects a visible basin of water                               |
| spin   | Pressure >= 70%, temperature > 0°     | Spins an exposed turbine                                        |

Targets have id/name/verb/x/y/w/h. Optional temp and pressure pairs tune warm
tasks. Optional effort scales the work required. Optional requires lists
earlier target IDs: blocked tasks do not intercept droplets or gain progress.
Completed structures stay stable, so a later hot-water task cannot invalidate
a finished bridge. Explicit `phase` recipes are the exception: their visible
build/open sequence deliberately reuses the same footprint.

Each call should have its own recognizable scene, one clear joke, and a small
thermal idea. Combine verbs and geometry, not just names. Warm-up first calls
should take roughly 30–90 seconds for a new player.

## Architecture

- engine.ts: bounded 60 Hz simulation; particle motion, grid erosion, target
  rules, dependencies, and scoring. No DOM or storage dependency.
- levels.ts/types.ts: authored content and schemas.
- render.ts: original Canvas characters, sets, ice, stream, and effects.
- input.ts: keyboard, standard gamepads, deadzones, reconnect state.
- main.ts/style.css: dispatch board, play view, accessible dialogs, pointer
  controls, responsive layout, frame loop, and lifecycle.
- save.ts/audio.ts: versioned best results, optional local storage, Web Audio.

The renderer includes the original five settings and each released pack's
native set and cast. Prop families live in `src/art/`; keep their silhouettes
recognizable at phone scale. Completion animates selected rescue props; not
every original call yet has a bespoke ending animation.

## Campaign additions

- `channels`: one visible inlet, a junction, and authored branch polylines to
  fill targets. Branch `gate` IDs require completed plugs. Mark destinations
  `flowOnly` so direct droplets cannot fake routed delivery. Inflow divides
  across open branches, including already-full tubs; filled tubs retain progress.
  An `overflowFrom` source must be full before its branch opens. Once the
  spillway gate also opens, that branch receives its source's surplus allocation.
  Draw its `via` path through the source's edge and spillway, not a shortcut.
  A `closedBy` ice plug instead shuts a branch when construction finishes.
  Each branch ends in either a routed `target` or a decorative `[x,y]` `outlet`;
  outlets consume runoff without adding a goal. For a directly filled source,
  put the inlet completely inside that source's FILL rectangle. Real target
  collisions fill it first; only later drops can enter the overflow inlet.
  See `08.15`. Retain a visible waste route and its plug so the closure is legible.
- Target `motion`: elliptical radii, period in seconds, and optional phase.
  Actual hitboxes move. Keep the full swept bounds reachable and provide clear
  labels. The saved stationary assist parks targets on the same path; it does
  not skip the temperature/pressure objective.
  Optional `after` IDs hold the initial pose until every start target finishes;
  the motion clock then starts without a positional jump. A `mobile` plan draws
  arms from its pivot to the actual listed target centers.
- Target `pulse`: beat `period`, `open` window, and optional `phase` offset,
  all in seconds. Only actual droplets arriving during the open window count.
  Closed windows preserve progress and never count as mistakes. Use generous
  windows (at least 0.3 seconds) and clear space above for GO/REST indicators.
  Gates use simulation time, so pause stops the beat. Saved untimed assist
  holds gates open without skipping thermal conditions or prerequisites;
  reduced-motion visitors default to untimed unless they explicitly choose otherwise.
  Optional positive `untimedOrder` numbers opt a set of lanes into patient
  sequencing: only the lowest unfinished numbered lane stays OPEN; the others
  show NEXT. Timed mode still follows their independent phase offsets. Switching
  modes preserves all work. Unnumbered gates retain their all-open assist.
- Prop `follow` attaches artwork to a live target. `reveal` defines the final
  pose/kind after the scene completes; `revealOnly` is for earned visual arrivals.
  `stamp` supplies the completion postcard's tiny joke.
  A FILL target's optional `fillColor` changes its completed basin to a story
  color (for example ink purple). Incoming water and thermal rules are unchanged.
- `balance`: collection targets supply capped masses from actual progress;
  a load without a `target` supplies a fixed mass. Optional per-load `arm`
  ratios (0.1–10, default 1) affect real torque and inertia; plan `arm` is the
  drawing scale in pixels. Massless arms with a hanging pivot ballast settle
  under damping. The `id` signals only after opposing torque matches and the
  beam rests level with nonempty loads. This is not buoyancy.
- `buoyancy`: the BALANCE family's floating-body exhibit. A completed
  `iceTarget` creates a rectangular pontoon; `fillTarget` supplies the basin's
  calibrated water height. Board geometry is pixels, `pixelsPerMeter` supplies
  scale, pontoon `depth` is metres, `loadMass` kilograms, densities kg/m³.
  Ice defaults to 917 and fresh water to 1000 kg/m³. The centered fixed load
  keeps the deck horizontal; vertical force is gravity minus displaced-water
  buoyancy, with wet damping, floor contact, and bounded integration substeps.
  `dockY` is only a measurement: no force targets that coordinate. Completion
  requires full water, free floating, balanced forces, a resting deck within
  half a pixel of the mark, and a 0.45-second stable hold. Invalid, grounded,
  incomplete, or sunk bodies cannot certify success. See `10.18`.
  The freeze footprint rests inside the basin on its floor. Once built, the
  renderer replaces that stationary rectangle with the physical deck/body and
  anchors the model athletes at its actual height. The waterline uses the same
  calibrated coordinates. This is not a volume-conserving fluid solver and does
  not model waves, rocking, moving loads, or remelting a completed pontoon.
  Local recall found no reusable buoyancy implementation. The existing balance
  module supplied only the bounded-step/rest-hold convention. Physics reference:
  [OpenStax, Archimedes' principle](https://openstax.org/books/university-physics-volume-1/pages/14-4-archimedes-principle-and-buoyancy)
  and [density table](https://openstax.org/books/college-physics-2e/pages/11-2-density).
- `optics`: a source direction, fixed mirrors tied to completed freeze targets,
  and circular detectors. Mirror angles are tangent angles in radians. Real
  rays reflect geometrically and stop on remaining melt-target ice cells;
  detectors emit their IDs when crossed. Optional `prisms` tie convex polygon
  `vertices` and a `refractiveIndex` to completed freeze targets. Use separated,
  non-touching polygons (3–16 vertices, index 1–4, all inside the board).
  Real boundary intersections follow Snell's law and total internal reflection,
  bounded to twelve surface interactions. This models the transmitted ray,
  not dispersion or Fresnel splitting. See `08.18`'s two descending ice prisms.
  The implementation reuses the mirror/cell/detector helpers recalled from
  session `01a06835`; refraction math follows
  [PBRT's derivation](https://pbr-book.org/4ed/Reflection_Models/Specular_Reflection_and_Transmission).
  Optional `splitters` use finite coated diagonals (`target`, `x`, `y`, tangent
  `angle`, `length`) tied to completed freeze targets. Each sends half its
  incoming power straight through and half along the reflected direction;
  actual downstream prism intersections and opaque ice still apply. Work is
  bounded to 32 lineages, 128 segments, twelve interactions per path, and a
  1/256 power cutoff. Detectors observe the actual segments, not authored ends.
  Split segments expose optional `power`; old unsplit shapes remain unchanged.
  Optional detector `name` and offset `label` identify people without placing
  captions across the rays. See `11.15`. The cube's outer faces are assumed
  normal to these incident/exit rays; this is an ideal geometric 50:50 coating,
  not polarization, interference, or wavelength dispersion. The wedding's
  completed pastel rainbow is celebratory paint along those same real paths.
  This extension reuses the optics from recalled session `01a06835-15f`;
  see [Edmund Optics on beam splitters](https://www.edmundoptics.com/knowledge-center/application-notes/optics/what-are-beamsplitters/).
  `12.14` instead uses two ordinary finite reflectors with `housing: "prism"`:
  the triangular ice housing displays a silvered diagonal, not another refracting
  medium. Source → first reflection → second reflection crosses two real eyelid
  detectors; the second remains blocked until its local frost is erased.
- Target `needsSignals` gates work on physical signal IDs, in addition to
  `requires`. Leave space for visible physical feedback, and a generous final
  warming target to celebrate success. See `05.14` and `05.16`.
  Level-level `needsSignals` can instead gate the whole win, as in `07.15`.
  A short `completionHint` explains physical settling after hose work finishes.
- Target `phase.steps` declares a finite sequence of freeze/melt operations in
  one footprint. Each step has a verb, name, optional prerequisites, and an
  optional earned signal. A completed step records its signal and changes the
  live target's verb/name/ice cells; only the final step marks the target done.
  Thus a basin may depend on `mold:formed` while remelting waits for that basin.
  The build/fill/open recipe strip, objective text, and monotonic overall progress
  show the sequence. Restart clears all phase history. See `06.14`.
  This is staged reversal, not yet freely adjustable coupled thermal bodies.
  `09.15` uses the same mechanism for freeze → melt → freeze: its ink basin
  starts enabled beneath the page, while the final recast waits for that basin.
  Local eroded holes admit real droplets before the whole page clears.
  Keep the recipe strip clear of both the page and the basin below it.
  `11.18` reuses that phase history for a leaf proof → remelt → shared proof.
  Its engraver unlocks from `band:leaf`, not the final band completion; remelting
  waits for the engraver. Both earned draft signals survive the recast, while
  restart clears them. The memory-book reveal celebrates both drafts.
  `12.18` uses the same sequence without a separate engraver: first support,
  opening the second panel, and the final repaired seam each earn a signal.
  Optional `Prop.signal` drives that prop's happy state and `revealOnly` visibility
  from an actual world signal. Do not combine it with `Prop.target`; without a
  signal, existing target-completion/whole-scene behavior remains unchanged.
  This is presentation only: it cannot complete targets or generate signals.
  Live optical signals can disappear; earned phase signals persist until restart.
  Positional `reveal` still runs only at whole-scene completion. This reuses
  the shipped mirror/phase implementation recalled from session `01a06835-15f`.
  Optional `Prop.foreground` draws earned art after completed work surfaces,
  before physical indicators and the hose. It never renders before that prop
  is ready; author it with `revealOnly: true`. Use sparingly for a finished
  illustration that must cover its old progress fill, such as `12.09`'s painted
  sunset cup. Keep neighboring unfinished targets and physical indicators clear.
- `src/campaign.ts` controls world metadata and Continue; `src/atlas.ts` handles
  accessible maps. Unbuilt `NN.SS` slots stay unbuilt even if later slots exist.
- `public/release.json` identifies the release that must be checked on the live
  site after a successful Pages deployment.

## Release checks

Every authored call is exercised through real emitted droplets by the unit
suite: no direct completion hook. Tests also cover prerequisites, thermal
limits, input bounds, saves, and blocked storage. Browser tests exercise
keyboard control, simulated standard gamepad input, an actual completed call,
progress persistence, and phone layout. This is a fast release gate, not a
long-running soak matrix.

Before adding many more calls, playtest a few with real controllers. Browser
simulation cannot prove physical-device ergonomics.
