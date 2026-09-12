# Melt Squad — the 400-scene campaign

**Campaign implemented: 20 worlds × 20 scenes = 400 playable rescues.**
The nineteen expansion packs add 380 scenes to the original twenty.

The [full scene catalog](campaign/SCENE_CATALOG.md) contains every new scene:
stable ID, visible setup, concrete puzzle sequence, visual/story payoff,
theme crossovers, and explicit future-system dependencies. Each level also has
its own premise, recurring cast, story arc, signature, and reusable art kit.

Design and implementation are complete. Each expansion was built and validated
one world at a time: see the [release ledger](RELEASES.md) for playable counts
and releases. The source cards preserve the original design baseline; language
about future systems below describes their authoring contract, not unfinished calls.

```text
MELT SQUAD — 400-scene campaign
|
+-- Level 01: First Shift ........... 20 playable scenes
|
+-- Levels 02–20 ................... 380 playable scenes
    |
    +-- 19 distinct themed levels
    +-- 20 scenes per level
    +-- Introduce -> remix -> cross over -> complicate -> synthesize -> finale
```

## All twenty levels

Here, a **level** means a themed 20-scene pack; a **scene** is one playable
rescue vignette. The current game's code calls individual scenes levels.
This document adopts the requested campaign vocabulary without changing code
or existing save IDs.

| Level | Theme | What makes it its own world |
| --- | --- | --- |
| 01 | First Shift — existing collection | The original teacup, wizard, Cupid, and seventeen other introductions. |
| [02](campaign/SCENE_CATALOG.md#level-02) | The Midnight Sock Exchange | Haunted laundry, mismatched partners, and a community of lonely socks. |
| [03](campaign/SCENE_CATALOG.md#level-03) | Brine & Parcel | An underwater post office learns how to deliver friendship above and below sea level. |
| [04](campaign/SCENE_CATALOG.md#level-04) | The Mostly Clockwork Circus | Mechanical performers discover that a good show has room for imperfect people. |
| [05](campaign/SCENE_CATALOG.md#level-05) | Borough of Very Small Affairs | Desktop-scale civic emergencies, ridiculous paperwork, and genuinely useful public services. |
| [06](campaign/SCENE_CATALOG.md#level-06) | The Great Pudding Republic | Desserts choose their own jobs, rewrite the menu, and invite the other courses. |
| [07](campaign/SCENE_CATALOG.md#level-07) | Fossilbean Preschool | Tiny dinosaurs, enormous feelings, and a first family open day. |
| [08](campaign/SCENE_CATALOG.md#level-08) | Emberborough Town Hall | Dragons build a city that welcomes every size and temperature. |
| [09](campaign/SCENE_CATALOG.md#level-09) | The Runaway Ending Library | Escaped story endings search for better jobs and places to belong. |
| [10](campaign/SCENE_CATALOG.md#level-10) | Mount Oops Sports Club | Mythological athletes remake sports around the participants. |
| [11](campaign/SCENE_CATALOG.md#level-11) | Ever After, Everywhere | Wedding planners make wildly incompatible worlds feel at home together. |
| [12](campaign/SCENE_CATALOG.md#level-12) | The Somnolent Seamworks | Dream tailors help a nightmare become somebody's comforting forest. |
| [13](campaign/SCENE_CATALOG.md#level-13) | The Forecast Conservatory | Grow pocket weather for communities with wonderfully specific needs. |
| [14](campaign/SCENE_CATALOG.md#level-14) | The Mycelium Local | A mushroom railway values its passengers more than an express timetable. |
| [15](campaign/SCENE_CATALOG.md#level-15) | The Institute of Almost Possible | An impossible-science museum turns uncertainty into curiosity. |
| [16](campaign/SCENE_CATALOG.md#level-16) | Last Exit Before Breakfast | A galactic roadside diner feeds travelers who do not share a size, clock, or planet. |
| [17](campaign/SCENE_CATALOG.md#level-17) | Toybox After Bedtime | Repaired toys build a rescue crew; the smallest star learns to lead. |
| [18](campaign/SCENE_CATALOG.md#level-18) | Apocalypse, Rescheduled | The Four Ponies of Mild Inconvenience discover a very important wording error. |
| [19](campaign/SCENE_CATALOG.md#level-19) | The Hotel Between Tuesdays | An impossible hotel discovers that hospitality matters more than arriving on time. |
| [20](campaign/SCENE_CATALOG.md#level-20) | The Great Thaw Festival | All nineteen earlier themes contribute to one shared celebration and campaign payoff. |

Every row after Level 01 has a complete design. Implementation status is recorded
in the release ledger, not inferred from this table. Numeric order is
the editorial campaign sequence, not a promise that all scenes must be locked
behind earlier completions.

## How each 20-scene sequence develops

| Scenes | Purpose |
| --- | --- |
| 01–04 | Establish the setting, cast, and signature interactions. |
| 05–08 | Remix them with different layouts, service orders, or tool settings. |
| 09–12 | Bring in other settings and visitors; broaden the world. |
| 13–16 | Add complications and a few clearly marked experimental scenes. |
| 17–19 | Combine local ideas and pay off character relationships. |
| 20 | A substantial rescue and visible story resolution. |

These are pacing intentions, not a requirement to reuse identical verb chains.
The design review specifically varied repeated openings, branch arrangements,
moving-target ideas, and finales. Every pack mixes at least three of the five
existing setting influences: kitchen, cave, garden, cosmos, and town.

## Implementation backlog

### P0 — make room for packs, without breaking the first twenty

- [x] Add a campaign/pack layer above the existing scene catalog.
- [x] Keep all current scene IDs and saved medals; place them in Level 01
      through a mapping, not a destructive save reset.
- [x] Replace hard-coded total-scene counts with catalog-derived totals.
- [x] Replace the flat dispatch board with the [rescue atlas and themed world
      maps](campaign/WORLD_MAP.md): twenty destinations, twenty scene nodes per
      world, compact previews, Continue, and direct replay. Ship navigation first
      using the existing First Shift scenes; unbuilt worlds remain previews.
- [x] Support keyboard, controller, touch, focus restoration, browser Back,
      reduced motion, and a compact accessible list alternative. Suggested routes
      must not lock released scenes behind stars or unfinished content.
- [x] Show per-level progress and distinguish designed slots from playable
      scenes. Unbuilt scenes must not award completion or inflate playable counts.
- [x] Support each pack's reusable art kit and an authored before/after
      presentation. Existing targets remain authoritative for success.
- [x] Start with a small complete Level 02 slice, validate its feel, then fill
      out the pack and repeat. Do not bulk-import 380 untested layouts.

### P1 — build the current-rules scenes, one coherent pack at a time

- [x] Use each scene card to author actual targets, coordinates, prerequisite
      IDs, settings, feedback, hint, scoring values, and final illustration.
- [x] Reuse art within a pack, but preserve each scene's actual visual problem
      and before/after change; a new title is not a new puzzle.
- [x] Keep recurring cast names and behaviors consistent across crossovers.
- [x] Verify reachability, hole-through-to-basin behavior where specified,
      cold/hot changes, and clear target signage.
- [x] Exercise keyboard, simulated controller, and touch/browser layout on
      representative scenes. Physical controller/phone feedback remains an
      explicit follow-up in [BACKLOG.md](BACKLOG.md), not an automated-test claim.
- [x] Commit and release complete content slices with bounded checks appropriate
      to each changed system.

“CURRENT RULES” in the catalog means the target mechanics already exist,
**not** that art, layouts, animation, or playtesting are done.

### P2 — build shared systems for the explicitly marked future scenes

| Tag | Shared capability | What must be visible and testable |
| --- | --- | --- |
| FLOW | Persistent runoff and connected channels/basins | Water must reach destinations through the route; direct nozzle hits cannot fake routed delivery. |
| MOTION | Moving goal zones and authored machinery paths | Predictable motion, readable tracking, and a stationary/slow assist. |
| BALANCE | Weight, buoyancy, and physical supports | Visible equilibrium and recovery from overshoot; avoid unlisted moving-hitbox requirements. |
| OPTICS | Reflection/refraction and detectors | A real, readable source-to-detector path, not invisible symbolic switches. |
| PHASE | Reversible completed structures and coupled thermal states | Clear thaw/refreeze transitions; existing stable constructions keep their current behavior. |
| PULSE | Timed or rhythmic gates | Repeatable windows and a fully untimed accessibility mode. |

The catalog gives exact affected scene IDs and counts. Build a small reusable
system slice before its dependent scenes. Pending experimental scenes should
not prevent access to the rest of their pack or the campaign finale; a pack
with unfinished scenes must still report those scenes as unfinished.

All six required system families now have implemented campaign examples and
bounded mechanical tests; the release ledger records which world introduced
each extension. No experimental scene remains a placeholder.

## Source, review, and maintenance

- Source cards: numbered JSON files in [campaign/](campaign/).
- Human-readable complete backlog: [SCENE_CATALOG.md](campaign/SCENE_CATALOG.md).
- Shared authoring rules: [DESIGN_CONTRACT.md](campaign/DESIGN_CONTRACT.md).
- Grounding: [current engine/authoring guide](LEVEL_AUTHORING.md) and the
  [original design thesis](DESIGN_THESIS.md).
- Three agents authored Levels 02–16; the coordinating agent authored 17–20.
  Cross-reviews covered all 380 cards, with corrections for repeated patterns,
  cast-name collisions, ambiguous dependencies, and unstated settings.
- Validation checks 19 packs, 20 scenes each, ordered unique IDs, globally
  unique scene titles, substantive cards, valid dependency tags, and at least
  16 current-rules scenes and three setting influences in every pack.

```sh
node docs/campaign/build-catalog.mjs          # validate cards and regenerate catalog
node docs/campaign/build-catalog.mjs --check  # validate and detect a stale catalog
```

These are document checks, not gameplay acceptance tests. Future cards still
need implementation and player feedback.

---

Earlier visual, control, and physics ideas remain in the [original
improvement backlog](BACKLOG.md). Nothing held there is silently marked shipped
by this campaign design pass.
