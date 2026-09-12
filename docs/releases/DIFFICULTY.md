# Your shift, your way — 0.18.1

- Easy is the unchanged default: visible work zones and exact recipe hints.
- Normal keeps zones visible but removes exact temperature/pressure recipes
  from objectives, the field manual, hints, and wrong-setting feedback.
- Impossible Challenge also hides colored work zones and their guides until
  correctly mixed water reaches an available spot. Illustrations and instruments
  stay visible. Real routed water counts; hovering, wrong mixtures, locked goals,
  and closed pulse windows do not. Fresh calls begin with water off and no
  pre-aimed recipe. Discovered spots remain known through staged rebuilds.

The native-button menu works from the sidebar, mission mode button, and Pause.
Mode changes preserve this attempt's progress and genuine discoveries; restart
clears discoveries. The setting is local, defaults safely to Easy for old saves,
and remains usable if storage is blocked. Medals and best times remain shared.

The agent review caught fresh-hub HUD initialization, preview-world spoilers,
cached hint leaks, and the need to preserve positive qualitative ice feedback.
This patch reuses the saved-assist/controller menu foundation recorded by local
recall `01a06835-15f`. It adds no server and changes no thermal acceptance rules.

Release gate: bounded discovery/save tests, browser hint/discovery/persistence
and controller checks, full regressions/build, exact-commit CI/Pages success,
and public artifact verification. Physical controllers and phones still need
hands-on comfort feedback.

Local unit acceptance: all 523 tests pass, including nine bounded difficulty,
save, discovery, and feedback regressions. Browser checks include actual Canvas
change after a correct hit, fresh-hub selection, persistence, mode-switch memory,
replay reset, controller-only selection, and phone overflow. The responsive
header now wraps when five navigation controls cannot fit on one row.

Eight local browser checks pass: the three new difficulty paths, existing
controller/untimed-assist behavior, all twenty current-world scenes, and phone
map/finale coverage. Visual review then tightened the wrapped navigation to
natural-width buttons, avoiding a tall stack inherited from desktop styling.
The final phone discovery test and compact-header screenshot pass after that
polish. Production TypeScript/build passes; the existing bundle-size advisory remains.
