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
- Prop `follow` attaches artwork to a live target. `reveal` defines the final
  pose/kind after the scene completes; `revealOnly` is for earned visual arrivals.
  `stamp` supplies the completion postcard's tiny joke.
- `balance`: collection targets supply capped masses from actual progress;
  a load without a `target` supplies a fixed mass. Optional per-load `arm`
  ratios (0.1–10, default 1) affect real torque and inertia; plan `arm` is the
  drawing scale in pixels. Massless arms with a hanging pivot ballast settle
  under damping. The `id` signals only after opposing torque matches and the
  beam rests level with nonempty loads. This is not buoyancy.
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
