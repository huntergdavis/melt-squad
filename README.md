# Melt Squad

**A little heat. A lot of heart.**

A hose-powered puzzle game about helping a wonderfully weird world warm up.
Thaw an upside-down space wizard, build a penguin an ice bridge, give the moon
a bath, and answer 20 hand-authored rescue calls.

[Play in your browser](https://huntergdavis.github.io/melt-squad/)

## Your equipment

| Action          | Keyboard     | Standard gamepad         |
| --------------- | ------------ | ------------------------ |
| Move nozzle     | WASD         | Left stick               |
| Temperature     | Up / Down    | Right stick up / down    |
| Pressure        | Left / Right | Right stick left / right |
| Tilt nozzle     | Q / E        | LB / RB                  |
| Toggle water    | Space        | A / Cross                |
| Restart         | R            | X / Square               |
| Pause           | Escape       | B / Circle or Start      |
| Menu navigation | Tab + Enter  | D-pad + A / Cross        |

Mouse and touch: drag the nozzle in the scene and adjust the two sliders.

Hot water erodes ice. Cold water builds marked structures. Gentle warmth
rescues delicate things. Pressure spins machines. Mix the five verbs across
20 individually authored puzzles, with no lives to lose and every call available
from the start. Medals, best times, and sound preference stay in your browser.

This is the first playable concept collection: arcade thermal puzzles, not a
full fluid-dynamics simulation. Completed constructions stay stable; tasks use
visible goal zones and explicit prerequisites.

## Run locally

Node 22.12+ and npm 10+ recommended.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, including the `/melt-squad/` path.

```sh
npm run check       # bounded gameplay tests, types, production build
npx playwright install chromium
npm run test:e2e    # browser, keyboard, simulated controller, touch layout, saves
```

Everything runs client-side. No accounts, API keys, analytics, or backend.
Art, fonts, and sound are local. A compatible controller needs a browser with
the standard Gamepad API mapping; press a controller button to connect it.

## Publish

The repository’s GitHub Actions workflow tests, builds, and deploys `dist/`
to GitHub Pages on pushes to `main`. Pages source must be **GitHub Actions**.
The Vite base path is `/melt-squad/`.

## More good deeds

- [Design thesis](docs/DESIGN_THESIS.md)
- [Level authoring and architecture](docs/LEVEL_AUTHORING.md)
- [Next slices](docs/BACKLOG.md)
- [Art credits and licenses](CREDITS.md)
