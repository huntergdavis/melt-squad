# Melt Squad — Design Thesis

## The pitch

**Melt Squad** is a playful puzzle-action web game about a firefighting crew
deployed wherever the world has become _too cold_. Instead of extinguishing
flames, the squad directs precisely controlled hot water to melt ice, free
people, reshape spaces, and solve odd little emergencies.

Every level is a self-contained vignette with one memorable premise: a frozen
cup, an upside-down space wizard, a cold heart, a trapped parade float, a
glacier that has swallowed a jukebox. The game should feel generous, tactile,
and a little ridiculous.

## Core fantasy

You are at the end of a powerful hose. You are not a soldier and not a
traditional firefighter: you are a skilled thermal problem solver. The joy is
in making matter change state exactly where you intend it to.

Hot water melts. Colder water freezes. Pressure determines reach, force, and
how dramatically the stream behaves. The player reads a scene, experiments,
and makes a satisfying physical intervention.

## Control thesis

The controls should make the player feel like they are operating a hose, not
selecting tools from a menu.

- **Left stick / WASD:** move the nozzle.
- **Right stick / arrow keys:** steer the thermal-pressure mix.
  - Up/down changes water temperature, from freezing cold through warm to
    dangerously hot.
  - Left/right changes pressure, from a gentle pour to a long, forceful jet.
- The stream is always live once a level starts. The interesting decision is
  how to aim and tune it, not whether to click “use water.”

The first playable prototype can map the arrow keys to temperature and pressure
in discrete, readable increments. Gamepad support should preserve the same
mental model with analog control.

## The interaction grammar

The game needs a small, legible set of physical verbs that combine into many
situations.

| Input                | Immediate behavior       | Puzzle meaning                                 |
| -------------------- | ------------------------ | ---------------------------------------------- |
| Hot + low pressure   | Local, gentle melt       | Precision; protect fragile things              |
| Hot + high pressure  | Fast, far-reaching melt  | Speed, force, clearing paths                   |
| Cold + low pressure  | Controlled ice growth    | Build plugs, bridges, keys, shapes             |
| Cold + high pressure | Rapid freeze / icy shove | Stop motion, create barriers, redirect hazards |
| Temperature sweep    | Soften then shape        | Timing, gradients, material-specific tricks    |

Ice should be more than a health bar. It can be a wall, support, weight,
reflector, ramp, buoy, insulation, timer, or emotional metaphor. Water should
feel like a visible material: it pools, drips, freezes, runs downhill, and
changes the room.

## Level structure

Each vignette should establish its joke or emotional idea almost immediately,
teach or remix one interaction, and end with a readable transformation.

1. **Arrival:** one bold image and a short mission line.
2. **Read:** the player sees why brute-force heat would be clumsy or harmful.
3. **Work:** aim, tune, improvise, and alter the space.
4. **Reveal:** the situation changes in a funny, warm, or surprising way.
5. **Departure:** a quick postcard-like result, then the next strange call.

Levels should be compact enough to invite replay and easy enough to watch from
across a room, while rewarding attentive hands-on play.

## Tone and presentation

Melt Squad is earnest about helping people and unserious about almost
everything else. Its world can be cosmic, domestic, romantic, civic, or
cartoonishly dangerous without becoming cynical.

The visual language should make temperature obvious at a glance:

- Cold water: pale blue, crystalline spray, sharp tinkling effects.
- Warm water: clear, soft steam, amber highlights.
- Hot water: white steam, red-orange nozzle glow, energetic hiss.
- Ice: chunky, translucent, visibly cracking and changing silhouette.

The hose is the central character on screen. The nozzle, stream, ice response,
and immediate consequence must always be more visually prominent than UI.

## First vignette ladder

### 1. Cup Rescue

A tiny tabletop disaster: a beautiful cup has frozen solid, trapping a tea bag,
a spoon, and perhaps a very small, judgmental mascot. Teach nozzle movement,
gentle heat, and the difference between melting the ice versus blasting the
contents across the kitchen.

### 2. The Wizard’s Feet

In an ice cave, an upside-down space wizard is frozen into the ceiling by their
boots. Melt the boots free without dropping the wizard onto a dangerous crystal
field. Introduce pressure as range/force, selective melting, and freezing water
to create a safe landing shape.

### 3. Cupid, On Call

A person’s literal cold heart has turned their apartment into an ice sculpture.
Melt carefully through metaphorical defenses, using heat to open paths and cold
water to create temporary heart-shaped bridges, protect keepsakes, or redirect
runoff. The goal is warmth, not simply removing all ice.

## Guardrails for future content

- Every puzzle should be understandable through the visible scene; avoid
  arbitrary switches when temperature, pressure, shape, and water flow can
  explain the answer.
- “Hotter is better” must never be universally true. Precision, restraint, and
  strategic freezing create the game’s depth.
- Failure should be slapstick and recoverable in most early vignettes.
- The squad helps; comedy should target circumstances, not vulnerable people.
- New mechanics should arrive as new kinds of cold problems, not a pile of
  generic upgrades.

## Prototype success criteria

The first prototype succeeds if, without text beyond a one-line mission, a
player can:

1. Move the nozzle and understand the live stream.
2. Notice that temperature changes ice differently.
3. Discover that cold water can build useful ice.
4. Complete a tiny scene and want to see the next bizarre emergency.
