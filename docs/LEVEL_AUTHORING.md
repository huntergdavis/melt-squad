# Authoring a rescue call

Calls live in src/levels.ts. The 20 shipped entries also serve as examples.
Add one Level with a stable id, title, short pitch, hint, ending, par time,
theme, starting nozzle settings, targets, and illustrated props. The board
and progression read that data directly. UI copy saying “20” will need to
change when growing the collection.

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

The current renderer has kitchen/cave/garden/cosmos/town sets and 16 reusable
illustrated prop kinds. Completion animates selected rescue props; not every
call yet has a bespoke ending animation.

## Validation

Every authored call is exercised through real emitted droplets by the unit
suite: no direct completion hook. Tests also cover prerequisites, thermal
limits, input bounds, saves, and blocked storage. Browser tests exercise
keyboard control, simulated standard gamepad input, an actual completed call,
progress persistence, and phone layout. This is a fast release gate, not a
long-running soak matrix.

Before adding many more calls, playtest a few with real controllers. Browser
simulation cannot prove physical-device ergonomics.
