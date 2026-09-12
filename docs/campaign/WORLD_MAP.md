# Melt Squad — the rescue atlas

**Status: functional atlas, maps, previews, Continue, saves, and accessible list
implemented with Pack 02. Physical-device playtesting and richer map-landmark
celebrations remain follow-up polish.**

Replace the expanding card wall with a playful overworld: twenty themed worlds,
each containing a winding route through twenty rescue scenes. Borrow the
readability of a classic world-map adventure, but make the identity our own:
storybook dioramas, hose-line routes, a little squad van, and rescued characters
who return to wave from their neighborhoods. No borrowed game art or branding.

## One clear hierarchy

```text
RESCUE ATLAS                          [Continue] [Settings]
  |
  +-- 01 First Shift ............ 20 playable / 20 planned
  +-- 02 Midnight Sock Exchange . coming later
  +-- ...
  +-- 20 Great Thaw Festival .... coming later
       |
       v  select an available world
THEMED WORLD MAP                      [All worlds] [Continue]
  |
  +-- 01 --- 02 --- 03 --- 04
                             |
      08 --- 07 --- 06 --- 05       ... through scene 20
  |
  v  select a scene node
COMPACT PREVIEW                       [Play] [Back]
  title / one-line rescue / medals / best time
  |
  v
PLAY -> RESCUE COMPLETE               [Next rescue] [World map] [Replay]
```

For player-facing navigation, call each twenty-scene pack a **world** and each
vignette a **scene** or **rescue**. A world is the user's campaign-level unit in
the [campaign plan](../CAMPAIGN_BACKLOG.md); this is not a new layer of content.
Keep existing runtime scene IDs, medals, and best times intact.

## Atlas: twenty memorable destinations, not four hundred buttons

- Give each world a distinct silhouette, palette, mascot, and tiny animated
  landmark: spinning sock moon, pudding parliament, dinosaur nursery, impossible
  hotel. Use the same reusable art kits as its scenes.
- Show the selected world's name, a short premise, and completed/playable counts
  in one shared preview. Do not pin a paragraph or stat panel to every landmark.
- Display all twenty destinations, but mark wholly unbuilt worlds **Coming
  later**. They may show a preview, never an enabled Play button or fake progress.
- In partially released worlds, use honest copy such as **4/6 rescues completed;
  6/20 available**. A full medal ribbon means all twenty scenes are shipped and
  completed, not merely all currently available scenes.
- Keep a prominent Continue action and a compact accessible world list as an
  alternative to spatial navigation. The atlas is a navigation screen, not a
  separate walk-around game that delays entering a puzzle.

## World maps: a story path with freedom to explore

- Author twenty stable node positions and a readable recommended route per
  world. Scenic bends and optional visual branches give each map character;
  route connections suggest narrative order, not mechanical unlock conditions.
- Every released scene remains directly playable. No star tolls, lives, forced
  travel animations, or prerequisite victories. Unbuilt experimental scenes
  cannot block later scenes or the festival.
- Node states: **Available** (number), **Completed** (check and medal pips),
  **Suggested next** (pointer), **Coming later** (dashed outline). Focus has its
  own high-contrast ring. Include text labels; color alone never carries state.
- Selecting a node reveals one compact preview and a clear Play action. Restore
  that node's focus when returning; never jump back to scene 01 unnecessarily.
- Let successful rescues bring small landmarks to life. Reuse each pack's cast
  and before/after art; do not require twenty additional minigames or bespoke
  map simulations. Cosmetic animation can follow the functional first slice.

## Continue, replay, and persistence

- Remember the last visited world and selected scene, separately from earned
  results. Continue first offers an unfinished scene the player left; otherwise
  the next released, uncompleted scene in that world, then the next world with
  an uncompleted released scene. Skip unbuilt nodes, never mark them complete.
- Continue is a scene-level restart, not a promise to restore in-flight droplets
  or a half-finished puzzle. Label it **Continue adventure** and show its target.
- If all released scenes are done, show **All available rescues complete** with
  Replay and Explore worlds, not a dead-end Next button or false campaign win.
- Next rescue follows the same released-scene ordering. At a world's end, offer
  the next available world and All worlds; do not force a long atlas animation.
- Extend persistence compatibly from `melt-squad-v1`. Existing `stars` and
  `best` records still use their original scene IDs. Invalid or missing map
  preferences fall back safely; denied storage must not prevent navigation.
- Use GitHub-Pages-safe hash navigation for atlas/world/scene selection; preserve
  `/melt-squad/` rather than introducing server-dependent routes. Browser Back
  should return through scene preview, world, and atlas without discarding medals.
  Invalid links show the nearest valid map with a short explanation.

## Controls and small screens

- Keyboard: Tab reaches every action; arrows navigate map nodes; Enter/Space
  selects and Escape backs out. Keep a predictable authored neighbor graph plus
  logical scene-order tabbing, rather than guessing neighbors from art coordinates.
- Standard gamepad: D-pad or left stick moves focus, A/Cross selects, B/Circle
  returns. Use a deadzone and bounded stick repeat; require release after opening
  a scene so the confirm press does not accidentally toggle the hose.
- Pointer/touch: tap destinations and generously sized nodes. No hover-only
  details. A focused node scrolls into view automatically; playing must never
  require dragging a huge map or precision gestures.
- On narrow screens use vertically scrollable, compact switchbacks; on wide
  screens use a broader diorama. Keep Continue and Back easy to find. Offer a
  simple numbered scene list using the same data and selection state.
- Pause gameplay while its map is open, and isolate map input from nozzle,
  temperature, and pressure controls. Back to an existing paused scene resumes
  it; selecting another scene must clearly indicate starting that rescue.
- Respect reduced motion, readable contrast, screen-reader names, and visible
  focus. Core node controls should be semantic DOM buttons, not canvas-only hits.

## Bounded implementation order and acceptance

1. Add the world catalog and legacy-scene mapping; preserve all twenty saves.
2. Ship atlas + First Shift's twenty-node map, preview, Continue, replay, and
   return navigation. The nineteen unbuilt worlds are honest previews only.
3. Verify keyboard, simulated gamepad, touch layout, focus restoration, browser
   Back, storage denial, legacy medals, and a partial-world fixture with an
   unbuilt middle node. Confirm Continue/Next skip it without awarding progress.
4. Playtest one physical controller and a phone; tune travel/focus feel before
   expanding content. Keep regression checks short and specific to navigation.
5. Add the first completed Level 02 content slice to the same system. Add map
   celebration art progressively; navigation must not depend on it.

Grounding reused: the existing ID-keyed save format in
[save.ts](../../src/save.ts), current menu/controller handling in
[input.ts](../../src/input.ts), and the
[level-authoring guide](../LEVEL_AUTHORING.md). This document specifies changes;
it does not claim those changes already exist.
