---
title: Commands and menu
description: Console commands and the admin spawn menu of aether_goblins.
---

Type these in the F8 console, without a leading slash. All of them need the ACE nodes
from [Configuration](/customer-docs/resources/aether-goblins/configuration/).

## Spawning

| Command | Needs | Does |
|---|---|---|
| `goblins` | `spawn` | Open the spawn menu |
| `goblin <type> [amount] [weapon] [mode] [scale]` | `spawn` | Spawn goblins in front of you |
| `goblin attack` | `spawn` | Set your goblins to attack |
| `goblin follow` | `spawn` | Set your goblins to follow you |
| `goblin stand` | `spawn` | Set your goblins to stand still |
| `goblin remove` | `spawn` | Remove your goblins |
| `goblin info` | `spawn` | Show your current goblins and limits |

Types: `boarhelm`, `grimfang`, `shaman`, `mix`.
Weapons: `default`, `machete`, `bow`, `mix`.
Modes: `attack`, `follow`, `stand`.

Amount and scale are held to `Config.Limits` and `Config.Scale`.

```
goblin mix 4 default attack
goblin shaman 1 bow stand 1.0
```

## Ambushes

| Command | Needs | Does |
|---|---|---|
| `goblinambush list` | `ambush` | List all ambush points with their numbers |
| `goblinambush test <nr>` | `ambush` | Fire one point on yourself |
| `goblinambush pos` | `ambush` | Print your position as a `vec3` line for the config |

## Menu

`goblins` opens the spawn menu. Pick a type, amount, weapon, mode and size, then spawn.
The same menu switches your goblins between attack, follow and stand, and removes them.
