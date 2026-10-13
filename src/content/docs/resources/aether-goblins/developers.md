---
title: Developer API
description: Server and client exports of aether_goblins.
---

Spawn exports wait for the goblins to exist, so call them from a thread or an event
handler, not from the top level of a file.

`mode` is `attack`, `follow` or `stand`. `type` is `boarhelm`, `grimfang`, `shaman` or
`mix`. Everything is held to `Config.Limits` and `Config.Scale`.

## Server exports

`targetServerId` is a player's server ID. `netId` is the network ID of a goblin, or the
string `'all'` for every goblin.

| Export | Returns |
|---|---|
| `SpawnGoblins(coords, type, amount, targetServerId, opts)` | list of net IDs |
| `AttackTarget(netId, targetServerId)` | nothing |
| `SetMode(netId, mode)` | nothing |
| `DespawnGoblins(netId)` | nothing |
| `GetGoblins()` | all goblins |
| `AddAmbush(coords, opts)` | the ambush ID |
| `RemoveAmbush(id)` | nothing |
| `TriggerAmbush(id, serverId)` | nothing |
| `GetAmbushes()` | all ambush points |

`opts` for `SpawnGoblins`, all optional:

| Field | Meaning |
|---|---|
| `weapon` | `default`, `machete`, `bow` or `mix` |
| `mode` | starting mode, `attack` by default |
| `scale` | size, held to `Config.Scale` |
| `heading` | facing in degrees |
| `ring` | `{ min = 15.0, max = 30.0 }`, distance from the target |
| `callback` | a function. With it, the call returns at once and the result is handed to the callback |

`opts` for `AddAmbush`: `radius`, `amount`, `type`, `chance` and `cooldown`, the same
fields as an entry in `Config.Ambush.points`. Missing fields fall back to
`Config.Ambush.defaults`.

```lua
local ids = exports.aether_goblins:SpawnGoblins(vec3(0.0, 0.0, 0.0), 'mix', 4, targetServerId, { weapon = 'mix' })
```

## Client exports

| Export | Returns |
|---|---|
| `SpawnGoblin(type, coords, opts)` | the ped |
| `AttackTarget(ped, targetPed)` | nothing |
| `Despawn(ped)` | nothing, `'all'` removes every goblin |
| `GetGoblins()` | local goblins |

`opts` takes `weapon`, `scale`, `mode`, `heading` and `target`.

## Permissions

The exports do not check ACE, only the commands and the menu do. Guard your own callers
the way you guard any other server function.
