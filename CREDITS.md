# Credits

- **Characters, scenes, interface, and icon:** original code-native artwork for Melt Squad.
- **Sparkle effect:** Kenney, [Particle Pack](https://kenney.nl/assets/particle-pack),
  Creative Commons CC0. The transparent star_01 sprite is included as
  public/art/spark.png. Original license: public/art/License.txt.
- **DM Sans:** [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/dmsans),
  SIL Open Font License 1.1. See public/fonts/dm-sans-license.txt.
- **Outfit:** [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/outfit),
  SIL Open Font License 1.1. See public/fonts/outfit-license.txt.
- **Sound:** original browser-synthesized interaction and completion notes.

All required assets are hosted in this repository. Gameplay makes no third-party
network requests.

## Scaffolding references

The existing The Grind 2 Pages workflow informed the static build/deploy layout.
Curse of the Herder's local progress restoration and visibility-change handling
informed browser lifecycle handling. No game systems or bulk content were copied.
Local session recall (`deja`) was checked; it returned no reusable input-system
implementation, so controller support was written specifically for Melt Squad.

- [Vite static deployment](https://vite.dev/guide/static-deploy)
- [Browser Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)
