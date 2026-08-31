---
title: Troubleshooting & performance
description: Diagnostics and performance tuning for dusk_scenes.
---

## Diagnostics

| Command | Scope | Shows |
|---|---|---|
| `/scenespool` | client | Object pool + streaming state. |
| `/scenesinfo` | server (admin) | Scene count + limits. |
| `/scenesclear` | server (admin) | Cleanup run. |

Run `/scenespool` at the busiest spot on your server to calibrate the pool limits (see
below).

## Performance tuning

The streaming cost is **one grid tick**, not one zone per scene — so the load does not
grow with the number of placed scenes. The tunables live in `Config.Stream`.

### Radii and hysteresis

`spawnDist` (`90.0`) and `despawnDist` (`105.0`) must stay apart. Without the gap, a
player standing exactly on the boundary spawns/despawns every second and stutters.

### Hard caps

| Setting | Protects |
|---|---|
| `maxEntities` | Concurrent props/peds this script spawns. Nearest win when full. |
| `maxEffects` | Particle effects — they cost fill-rate, not entity budget. |
| `minFreePedSlots` | Stops corpse spawning when the ped pool is almost full. |

### Pool watchdog

`maxEntities` only limits what *this* script spawns — it doesn't know how full the game
object pool already is (Saint Denis fills a lot of it). So the actual pool is measured:

- At `poolSoftLimit` (`2400`) no **new** objects spawn.
- At `poolHardLimit` (`2800`) own objects are **despawned**, farthest first.

Only own objects are touched. These two are **high on purpose** — they're the emergency
brake, not the normal limit. `0` disables either. Calibrate from `/scenespool` at the
fullest location.

### Grid range limit

`lib.grid` only returns entries from a window of roughly **241 units** around the player
(ox_lib cell size). Radii beyond that don't make more visible — they just make edge
objects flicker. The script caps oversized values itself and prints a warning.

## Schema doesn't create

The table is created automatically on startup via `INFORMATION_SCHEMA` (works on MySQL
5.7+, MySQL 8 and MariaDB). If it fails, the console prints:

```
[dusk_scenes] Prüfe mysql_connection_string und die Rechte des DB-Users.
```

Check the `mysql_connection_string` and that the DB user has `CREATE`/`ALTER` rights.

## Griefing

- `Config.DeletePolicy = 'anyone'` lets every player delete every scene. On public
  servers prefer `'owner_or_admin'`.
- The lifetime cap (`Config.MaxDurationSeconds`) plus `Config.MaxScenesPerChar` /
  `Config.MaxScenesTotal` are the real anti-spam — the cooldown only throttles.
