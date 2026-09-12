# Melt Squad

**A little heat. A lot of heart.**

A hose-powered puzzle game about helping a wonderfully weird world warm up.
Thaw an upside-down space wizard, build a penguin an ice bridge, give the moon
a bath, help an octopus plan a wedding, and teach a nightmare to become a cozy forest.
**280 hand-authored rescue calls. Fourteen playful worlds. One very helpful hose.**

[Play in your browser](https://hunterdavis.com/melt-squad/)

Explore the rescue atlas, follow a world's story trail, or pick any available
scene. New in **The Mycelium Local**: help an unhurried mushroom railway welcome
every passenger. Lift a freight teacup, balance surprisingly weighty books,
and give the smallest platform the biggest wave. The porter gets soup, too.
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
280 individually authored puzzles, with no lives to lose and every released call available
from the start. Medals, best times, and sound preference stay in your browser.

These are arcade thermal puzzles, not a full fluid-dynamics simulation.
Completed constructions stay stable unless a marked recipe asks you to remelt
them. Rinse channels and overflow spillways carry actual routed water;
moving care pads offer a saved stationary assist. Rhythm gates have clear
GO/REST cues and saved untimed play; both assists are in Pause. Balance actual
water and ice loads, reflect sunlight through a freshly melted opening, or
refract it through real triangular prisms and share it with a beam splitter.
Build a loaded ice pontoon and watch
buoyancy lift its deck to the dock as the basin fills.
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
- [Campaign release ledger](docs/RELEASES.md) — fourteen worlds implemented; six to go
- [400-scene campaign plan](docs/CAMPAIGN_BACKLOG.md) — the full design backlog
- [Art credits and licenses](CREDITS.md)
