# Authoring a rescue call

Calls live in src/levels.ts. The 20 shipped entries also serve as examples.
World packs' authored layouts live in `src/packs/NN.ts`; append new packs after
legacy content, keep their `NN.SS` IDs, and set `pack` to their world ID.
Add one Level with a stable id, title, short pitch, hint, ending, par time,
theme, starting nozzle settings, targets, and illustrated props. The board
and progression read that data directly. Each world contains twenty scenes;
the release marker and tests track the total playable count.

Pack JSON imports must include `with { type: "json" }`, as in `src/packs/03.ts`.
Vite and the Node-based browser-test runner both load these modules. Check
`npx playwright test --list` before starting a release build to catch import errors early.

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
a finished bridge.

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
- Target `motion`: elliptical radii, period in seconds, and optional phase.
  Actual hitboxes move. Keep the full swept bounds reachable and provide clear
  labels. The saved stationary assist parks targets on the same path; it does
  not skip the temperature/pressure objective.
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
- `balance`: fixed left/right collection targets supply capped masses from
  actual progress. Equal-arm torque and damping move the visible scale; its
  `id` becomes a signal only after matched, nonempty loads settle level.
  This first slice is not buoyancy or movable target geometry.
- `optics`: a source direction, fixed mirrors tied to completed freeze targets,
  and circular detectors. Mirror angles are tangent angles in radians. Real
  rays reflect geometrically and stop on remaining melt-target ice cells;
  detectors emit their IDs when crossed. Refraction/splitting remain future work.
- Target `needsSignals` gates work on physical signal IDs, in addition to
  `requires`. Leave space for visible physical feedback, and a generous final
  warming target to celebrate success. See `05.14` and `05.16`.
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
