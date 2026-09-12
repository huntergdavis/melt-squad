# World 20 — The Great Thaw Festival

The final twenty rescues bring all nineteen earlier worlds to the same plaza.
A shy volunteer pigeon thinks everyone else's contribution is more impressive.
Mismatched sock bunting, a self-applauding queue, soup's honorary dessert
citizenship, a dance floor for every kind of pair, and a room for the last
volunteer show what remembering people's needs can build.

- Twenty source-authored puzzles and earned postcards, with returning original
  cast art and a plaza that gathers the campaign's contributions.
- Independent reading-nest repairs and differently sized dance cups allow
  meaningful alternate service orders, without invisible story flags.
- A local seven-task finale: thaw two pennants and build two lantern bases in
  any order, fill the welcome basin, gently warm the heart, then turn the turbine.
  Earlier-world medals are never required; the whole campaign is freely accessible.
- After actual completion, nineteen contribution lights illuminate once across
  the final panorama. Reduced motion shows the earned tableau immediately.
- The atlas now says twenty worlds open and 400 rescue calls, with no stale
  coming-later legend on complete worlds. Completed saves retain direct replay.

Easy, Normal, and Impossible Challenge remain saved modes. The on-screen water
and downward-aim buttons remain removed: drag the nozzle and use two sliders.
Fresh Challenge calls spray neutral water until you choose a working mix.
Optional keyboard/controller shortcuts remain available.

This release reuses the existing five thermal verbs and campaign scaffolding
(local recall `01a06835-15f`; recovered campaign session `3ddd3436-8dc`). It adds
no server, LLM, new simulation subsystem, or prerequisite playthrough. Original
source cards remain in `docs/campaign/20.json`.

Release gate: all twenty authored actual-water solutions, focused branch and
replay checks, earned-ending visual review, full unit tests, TypeScript,
production build, browser controls/layout, exact-commit CI/Pages success, and
public artifact/atlas/finale/credits verification. Automated input and phone
layout checks do not claim physical hardware testing.

Campaign after release: **20/20 worlds · 400/400 scenes · no remaining packs.**
The nineteen expansion releases are `pack-02` through `pack-20`; optional future
polish and real-device feedback remain separate in `docs/BACKLOG.md`.

Source acceptance: all twenty scenes solve with authored water settings; nineteen
meaningful alternate orders also pass. The pack contains 117 targets, 58 initial
prerequisite locks, twenty unique stamps, and eighteen correctly aligned vessel
surfaces, including the dance floor's smaller cup. Three bounded actual-water
regressions cover independent reading nests, both band/cup service orders, and
both mixed finale orders with locked/wrong-mixture negatives and fresh replay.
Independent full-source review found no mechanics or prerequisite blockers.

The full local unit suite passes all 571 cases, and `npx tsc --noEmit` passes.
All twenty earned endings were captured with actual nozzle water and reviewed.
The finale browser check initially exceeded its wall-clock budget while rendering
unnecessary fixed-duration sprays; its trace showed successful solve, save, and
replay assertions. It now advances only until each visible objective completes,
retaining the same assertions, spray budgets, and 90-second overall limit.

The final eight selected browser cases all pass: real-water finale and replay,
completed-campaign navigation, all twenty Festival screens, phone layout, saved
difficulty, correct-water discovery, and simulated controller access. The 26
native Festival props pass 1,331 drawing assertions. Caption and cast overlaps
found in earned screenshots were corrected without moving work zones or vessels;
the duplicate finale banner was removed to keep the top work area clear.
