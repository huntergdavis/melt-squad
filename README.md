# Melt Squad

**A little heat. A lot of heart.**

A hose-powered puzzle game about helping a wonderfully weird world warm up.
Thaw an upside-down space wizard, build a penguin an ice bridge, give the moon
a bath, give a brass giraffe her curtain call, and help a dragon file a puddle permit.
**160 hand-authored rescue calls. Eight playful worlds. One very helpful hose.**

[Play in your browser](https://hunterdavis.com/melt-squad/)

Explore the rescue atlas, follow a world's story trail, or pick any available
scene. New in **Emberborough Town Hall**: Mayor Cinder and tiny clerk Flint
welcome every size of dragon. Unfurl enormous queue tickets, keep the paperwork
dry, and bend sunshine through ice prisms for a very important municipal cat.
No lives, no grinding, no account.

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
| Menu navigation | Tab / arrows + Enter | D-pad / left stick + A / Cross |

Mouse and touch: drag the nozzle in the scene and adjust the two sliders.

Hot water erodes ice. Cold water builds marked structures. Gentle warmth
rescues delicate things. Pressure spins machines. Mix the five verbs across
160 individually authored puzzles, with no lives to lose and every released call available
from the start. Medals, best times, and sound preference stay in your browser.

These are arcade thermal puzzles, not a full fluid-dynamics simulation.
Completed constructions stay stable unless a marked recipe asks you to remelt
them. Rinse channels and overflow spillways carry actual routed water;
moving care pads offer a saved stationary assist. Rhythm gates have clear
GO/REST cues and saved untimed play; both assists are in Pause. Balance actual
water and ice loads, reflect sunlight through a freshly melted opening, or
refract it through real triangular prisms.
Earn medals, collect silly
rescue postcards, and return to your last world. Credits and open-asset licenses
are available in the game.

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
- [Campaign release ledger](docs/RELEASES.md) — eight worlds implemented; twelve to go
- [400-scene campaign plan](docs/CAMPAIGN_BACKLOG.md) — the full design backlog
- [Art credits and licenses](CREDITS.md)
