---
title: Configuration
description: Every option in config.lua for aether_goblins.
---

Everything lives in `config.lua`, which stays readable after escrow.

## General

```lua
Config.Locale = 'en'
Config.Scale = { default = 0.5, min = 0.25, max = 3.0 }
Config.Health = 300
Config.CorpseSeconds = 90
Config.AggroRadius = 80.0
Config.Limits = { total = 24, perSpawn = 8, perPlayer = 12 }
```

| Option | Meaning |
|---|---|
| `Locale` | language, see below |
| `Scale` | default, minimum and maximum goblin size. `0.5` is about 1 m tall |
| `Health` | health of every goblin |
| `CorpseSeconds` | how long a dead goblin stays before it is removed |
| `AggroRadius` | distance in metres at which a goblin goes for its target |
| `Limits.total` | goblins alive at once on the whole server |
| `Limits.perSpawn` | goblins in a single spawn |
| `Limits.perPlayer` | goblins one player can have out |

## Permissions and commands

```lua
Config.Ace = { spawn = 'aether_goblins.spawn', ambush = 'aether_goblins.ambush' }
Config.Commands = { menu = 'goblins', control = 'goblin', ambush = 'goblinambush' }
```

Grant the nodes to your staff group in `server.cfg`:

```
add_ace group.admin aether_goblins.spawn allow
add_ace group.admin aether_goblins.ambush allow
```

| Node | Allows |
|---|---|
| `spawn` | the menu and the `goblin` command |
| `ambush` | the `goblinambush` command |

Rename any command in `Config.Commands` if it clashes with another resource.

## Goblin types and weapons

```lua
Config.Goblins = {
    { id = 'boarhelm', label = 'Boarhelm', outfit = 0, weapon = 'machete' },
    { id = 'grimfang', label = 'Grimfang', outfit = 1, weapon = 'bow' },
    { id = 'shaman',   label = 'Shaman',   outfit = 2, weapon = 'bow' },
}

Config.Weapons = {
    { id = 'machete', weapon = 'WEAPON_MELEE_MACHETE' },
    { id = 'bow',     weapon = 'WEAPON_BOW', ammo = 'AMMO_ARROW' },
}
```

Each goblin entry names the weapon it carries by default. `Config.Weapons` maps those
names to the game weapon. The types `boarhelm`, `grimfang`, `shaman` and `mix` can be
used everywhere a type is asked for.

## Ambush points

```lua
Config.Ambush = {
    enabled = true,
    debug = false,
    checkMs = 1500,
    ring = { min = 15.0, max = 30.0 },
    despawnAfter = 180,
    leaveFactor = 3.0,
    maxActive = 4,
    retryAfter = 30,
    defaults = { radius = 40.0, amount = 3, type = 'mix', chance = 100, cooldown = 600 },
    points = {},
}
```

| Option | Meaning |
|---|---|
| `enabled` | switches all ambushes on or off |
| `debug` | prints ambush activity to the console |
| `checkMs` | how often player positions are checked against the points, in milliseconds |
| `ring` | distance from the player at which the goblins appear, in metres |
| `despawnAfter` | seconds until an ambush removes itself |
| `leaveFactor` | multiple of the radius a player has to get away to end the ambush |
| `maxActive` | ambushes running at the same time |
| `retryAfter` | seconds before a missed roll can be tried again |
| `defaults` | values used when a point leaves a field out |

### Adding a point

Add entries to `points`. Only `coords` is required:

```lua
points = {
    { coords = vec3(0.0, 0.0, 0.0), radius = 40.0, amount = 4, type = 'mix', chance = 35, cooldown = 600 },
}
```

| Field | Meaning |
|---|---|
| `coords` | centre of the point |
| `radius` | trigger distance in metres |
| `amount` | goblins per ambush |
| `type` | `boarhelm`, `grimfang`, `shaman` or `mix` |
| `chance` | hit chance in percent, rolled once when a player enters the radius |
| `cooldown` | seconds before the point can fire again |

Stand where you want the point and run `goblinambush pos` in the F8 console. It prints
the position as a ready `vec3` line to paste into `points`.

## Language

```lua
Config.Locale = 'en'
```

Seven languages ship: `en`, `de`, `fr`, `pt`, `es`, `th`, `it`. The texts live in
`locales/` and stay readable after escrow, so rewording them works the same way as
adding your own file. Keep the `%s` and `%d` placeholders and their order.
