# Melt Squad — next slices

## Campaign expansion — one complete world per release

Current implementation: **380 scenes / 19 worlds**. See the [release ledger](RELEASES.md).

Difficulty feature, before Worlds 19–20:

- [x] Saved difficulty: **Easy** (current recipe hints, default), **Normal**
      (no temperature/pressure recipe hints), and **Impossible Challenge**
      (also hide target boxes until correctly mixed water discovers them).
      Keep the nozzle controls readable and allow changing modes without losing work.
- [x] Remove the Water off and Aim down screen buttons; give the two sliders
      the full instrument row. Challenge starts spraying a neutral mix automatically.

- [x] Design 19 new themed levels of 20 scenes each: 380 new scenes, 400 total
      including the existing collection.
- [x] Record setup, puzzle sequence, payoff, crossovers, reusable art, and
      explicit future-system dependencies.
- [x] Design [overworld navigation](campaign/WORLD_MAP.md): a twenty-world
      rescue atlas, themed scene paths, quick Continue, and accessible controls.
- [x] Implement world-map navigation; preserve
      save IDs and clearly distinguish playable content from coming-later previews.
- [ ] Build and playtest the new content one themed pack at a time.
- [x] Pack 02: twenty Sock Exchange scenes, original cast, postcards, routed
      rinse water, moving care pads, and stationary assist.
- [x] Pack 03: twenty Brine & Parcel scenes, an original reef cast, branching
      postal water, an express snail, and an invitation-to-friendship story.
- [x] Pack 04: twenty Mostly Clockwork Circus scenes, a brass ensemble, moving
      rehearsal wheel, real rhythm gates, and controller-accessible untimed play.
- [x] Pack 05: twenty Borough scenes, tiny civic friendships, an actual settling
      mass balance, geometric mirror reflections, and sunlight detectors.
- [x] Pack 06: twenty Pudding Republic scenes, a dessert ensemble, reversible
      build/fill/open molds, connected syrup overflow, and a shared breakfast.
- [x] Pack 07: twenty Fossilbean Preschool scenes, a dinosaur class, unequal-arm
      seesaw physics, a thaw-started hammock mobile, and a long-neck family photo.
- [x] Pack 08: twenty Emberborough scenes, a varied dragon community, plug-closed
      drainage and source overflow, two-prism refraction, and a welcoming town hall.
- [x] Pack 09: twenty Runaway Ending Library scenes, a paper-and-punctuation cast,
      actual second-draft recasting, moving book carts, and an inclusive picnic book.
- [x] Pack 10: twenty Mount Oops sports scenes, mythological athletes, ordered
      untimed rhythm lamps, real loaded-pontoon buoyancy, and a medal for the bench.
- [x] In-game credits with local Kenney and font license acknowledgements.
- [x] Pack 11: twenty Ever After wedding scenes, an eight-armed planner and
      mixed-climate families, real two-branch optics, and rings preserving both proofs.
- [x] Pack 12: twenty Somnolent Seamworks scenes, a dream-repair cast, two reflected
      moon-eyes, earned quilt-panel acknowledgements, and a comforting forest's debut.

- [x] Pack 13: twenty Forecast Conservatory scenes, pocket-weather friendships,
      actual cloud irrigation, a moving planter, and room for a mixed-weather seedling.
- [x] Pack 14: twenty Mycelium Local scenes, an unhurried mushroom railway,
      an ascending freight cup, a settling book counterweight, and a stop for everyone.
- [x] Pack 15: twenty Institute scenes, improbable exhibits and careful questions,
      true light apertures, a prebuilt buoyant footnote, and room for the next idea.
- [x] Pack 16: twenty cosmic diner scenes, a pancake's modest lunar ambitions,
      sequential syrup overflow, accessible breakfast beats, and a place for the cook.
- [x] Pack 17: twenty bedtime toybox scenes, continuously adjustable ice ballast,
      three orbiting biscuit moons, and a tiny star leading a nightlight parade.

- [x] Pack 18: twenty reassuring apocalypse scenes, real remeltable soup gates,
      three adjustable ice prisms, tea chimes, and an anxious moth joining the picnic.
- [x] Pack 19: twenty impossible-hotel scenes, a coherent moving aquarium cabin,
      actual room-service channels, and a snail porter who remembers every guest.
- [ ] Pack 20: The Great Thaw Festival — the final twenty-scene shared celebration.

Start with the [campaign plan](CAMPAIGN_BACKLOG.md) and
[complete 380-scene catalog](campaign/SCENE_CATALOG.md). Those source designs
are distinct from the implemented/released counts in the release ledger.

## First playable collection

- [x] Client-only TypeScript/Canvas game with static GitHub Pages workflow.
- [x] 20 authored calls across five themed sets.
- [x] Ice-grid melting, cold construction, warming, filling, pressure turbines.
- [x] Target prerequisites and stable completed constructions.
- [x] Keyboard, standard gamepad, pointer/touch, visible sliders, pause/restart.
- [x] Local medals/best times, optional synthesized audio, reduced ambient motion.
- [x] Open-license sparkle art and locally hosted open fonts.
- [x] Bounded simulation and browser tests.

## P0 — learn from the first real play sessions

- [ ] Physical Xbox/PlayStation controller playtest on target browsers.
- [ ] Tune nozzle speed, pressure feel, level par times, and first-call teaching
      from player feedback; add optional slow/assist control if needed.
- [ ] Mobile landscape/touch ergonomics pass on real phones.

## P1 — make every rescue more tactile

- [ ] Bespoke ending animation and before/after postcard for every call.
- [x] Distinct dragon, envelope, sun, and snow-cone-machine art.
- [ ] Gentle continuous hose audio with temperature/pressure response.
- [ ] Depth beyond target zones: flowing runoff, pools, movable objects,
      physical ice supports, and deflection surfaces.
- [ ] More discoverable controller-specific prompts and optional rebinding.

## P2 — expand the dispatch book

- [x] Design content packs toward hundreds of calls; see the campaign backlog.
- [ ] Implement those content packs after validating their representative slices.
- [ ] More spatial puzzles: mirrors, pipes, pressure gates, balance, insulation.
- [ ] Daily rescue, optional challenge medals, a postcard collection.
- [ ] Level-author preview tools and content validation outside the test suite.

No LLM, server, monetization, or progression grind is required for this game.
