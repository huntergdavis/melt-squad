# Campaign backlog design contract

This is a design backlog, not a claim that new scenes are implemented.
In the campaign vocabulary, a **level** is a themed collection of **20 scenes**.
The current collection is Level 01; the requested expansion is Levels 02–20,
380 new scenes, for 400 total. The runtime currently calls each scene a Level;
leave runtime code and saves unchanged during this design pass.

## Deliverable schema

Author a JSON object with a `packs` array. Each pack contains:

- `id`: two-digit campaign level ID.
- `title`: distinctive theme name.
- `premise`: the story and place being explored.
- `arc`: how the 20-scene sequence changes that place or its inhabitants.
- `signature`: the pack's recognizable visual/puzzle identity.
- `newArt`: array of reusable art-kit items, not one-off full-screen assets.
- `scenes`: exactly 20 objects in order, each containing:
  - `id`: `02.01` style stable ID.
  - `title`: unique short name.
  - `setup`: the visible problem, including its spatial staging.
  - `puzzle`: concrete target actions, order/choice, settings when relevant,
    and the actual challenge; avoid merely listing verb names.
  - `payoff`: a visible before/after change and a warm, absurd story beat.
  - `crossover`: one or more of `kitchen`, `cave`, `garden`, `cosmos`,
    `town`; these are existing theme influences, not claims of existing art.
  - `requires`: array of approved future-system IDs, or empty.

Aim for 45–85 words per scene across setup/puzzle/payoff combined. Be concrete,
not verbose. A theme needs twenty puzzle situations, not twenty noun swaps.
Packs should use at least three existing theme influences across the sequence.
Introduce the theme in scenes 01–04, remix it in 05–08, cross over in 09–12,
add complications in 13–16, synthesize in 17–19, and pay it off in scene 20.

## Current mechanical vocabulary

- MELT: water >=10° locally erodes ice cells; holes let later drops through.
- FREEZE: water <=−10° fills a marked construction footprint.
- WARM: hold the target's temperature AND pressure ranges.
- FILL: liquid water >0° fills a marked basin.
- SPIN: water >0° and pressure >=70% drives a marked turbine.
- All targets can have earlier-target prerequisites. Completed targets stay
  complete; finished structures do not melt again. Blocked targets are
  transparent to droplets, not physical locks or shields.
- Targets are stationary rectangular zones. Nozzle moves freely; water has
  ballistic motion and gravity, but there are no physical walls, sensors,
  mobile goals, flowing pools, freeform bridges, or autonomous characters.
- Helpers, passengers, machines, and scene transformations can be scripted
  visual payoffs. Do not imply these already have simulation logic.
- Gentle low pressure affects WARM conditions; MELT currently has no
  target-specific pressure gate. FILL has no temperature band above zero.
  Use WARM, not FILL/MELT, for precision-temperature/pressure conditions.
- No timers, failure lives, paid upgrades, LLMs, or extra inputs are required.
  Playfulness and readable cause/effect take priority over punishing precision.

## Implementation-readiness policy

An empty `requires` means the scene can use today's target/verb rules after
normal content authoring, new art, and scripted completion presentation.
It does NOT mean the scene is already implemented, layout-tested, or cheap.

At least 16 of each pack's 20 scenes must use current rules only.
Optional future scenes must name their dependencies from this registry:

- `FLOW`: persistent flowing water, routed channels, and basin connectivity.
- `MOTION`: moving target zones and deterministic mechanical motion.
- `BALANCE`: mass, buoyancy, weights, and physical supports.
- `OPTICS`: actual beam reflection/refraction and beam detectors.
- `PHASE`: reversible finished constructions and coupled temperature states.
- `PULSE`: timed/rhythmic gates with an untimed accessibility mode.

Do not silently require a new system. A visual wheel can turn after SPIN with
no new physics; a wheel that moves a live target through the water requires
MOTION. A character crosses a completed ice bridge in a cutaway using current
rules; a dynamically collapsing bridge that physically carries them needs
BALANCE and possibly PHASE. Dependencies gate those scenes, not the entire
pack. The campaign should remain playable while optional systems are deferred.

## Scope and quality bar

- Design only. Do not edit game code, implement levels, or deploy anything.
- Keep the humor generous; the squad helps people and creatures.
- Thread recurring characters and consequences through each sequence.
- Use geometry, tool-setting changes, branching prerequisite arrangements,
  negative-space carving, and contrasting service stations for variety.
- Avoid fake mechanics: no obstacle collision, spill loss, auto-draining,
  resettable completed targets, or force on loose objects without dependencies.
- Mark new art explicitly. Do not substitute an existing UFO for every animal.
- Every scene must have a visible outcome, not just a checklist completion.
