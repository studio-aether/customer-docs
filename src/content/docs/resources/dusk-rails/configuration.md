---
title: Configuration
description: Every setting in Rail.Config, what it does and when to touch it.
---

Everything lives in `shared/config.lua`, which stays readable after escrow. Line
definitions have their own page: [Lines & junctions](/customer-docs/resources/dusk-rails/lines/).

The defaults are tuned for a live server. The three groups you have a real reason to
touch are the radii, the blips and the ghost sweep.

## Range

| Setting | Default | Purpose |
|---|---|---|
| `spawnRadius` | `800.0` | A player has to be this close to the spawn point before a line spawns. |
| `despawnRadius` | `1400.0` | The train is removed once every player is further away than this. |

Keep the two apart. With a single radius, a player patrolling the boundary would spawn
and remove the same train over and over. The gap is deliberate hysteresis, not slack.

Larger radii mean more trains alive at once and more spawn work on the clients near
them. Smaller radii mean a player can outrun the line and meet a freshly spawned train
where they left the old one.

## Timing

| Setting | Default | Purpose |
|---|---|---|
| `tickController` | `250` | Controller loop: junctions, station detection, position reports. |
| `tickPassive` | `1000` | Claim and blip loop on every client. |
| `tickJunctionGuard` | `2000` | Interval at which `Rail.AutoForks` is forced. |
| `reportInterval` | `1500` | Heartbeat of the controller, sent even when the train did not move. |
| `positionDelta` | `10.0` | Minimum movement in metres before a position is included in a report. |
| `controllerTimeout` | `8000` | Silence after which the server drops the controller and lets another client claim. |
| `orphanTimeout` | `20000` | Silence after which a running line with players nearby is reset entirely. |
| `stationWait` | `45000` | How long a train holds at a station, measured on the server clock. |
| `haltCooldown` | `5000` | Guard against a line reporting the next stop immediately after the last one. |
| `respawnDelay` | `15000` | Wait before a reset line is allowed to spawn again. |

`stationWait` is the one with a visible effect: it is how long players wait at a station
before the train pulls out. The rest is machinery.

## Spawn control

| Setting | Default | Purpose |
|---|---|---|
| `spawnTokenTimeout` | `30000` | How long a client may take for one step of the spawn before the token expires. |
| `spawnGraceTotal` | `90000` | Hard ceiling on one spawn attempt, no matter how often it reports progress. |
| `tokenPenalty` | `60000` | How long a client that failed a spawn is skipped when picking the next candidate. |

A client loading train models reports progress, which extends its token up to
`spawnGraceTotal`. A client that stalls loses the token, takes the penalty, and the line
goes to the next nearest player. Raise `spawnGraceTotal` only if you see spawn failures
from players on very slow disks.

## Junctions

| Setting | Default | Purpose |
|---|---|---|
| `junctionApply` | `25.0` | Distance to a fork at which the switch is applied. |

Too small and the switch lands after the train is already on the points. Too large and
two forks that sit close together fight each other. 25 m works on the vanilla map.

## Blips

| Setting | Default | Purpose |
|---|---|---|
| `blips` | `true` | Master switch for all train blips. |
| `blipRange` | `true` | Keep the blip on the map while the train is out of streaming range. |

Per line, `blip = true` decides whether that line carries one at all. While the train is
streamed to you, the blip sits on the entity. Once it is not, `blipRange` keeps the blip
alive at the position the server holds, so a train another player is driving stays
visible. When a line is not running there is no blip, because there is no train.

## Ghost sweep

| Setting | Default | Purpose |
|---|---|---|
| `sweepGhosts` | `true` | Delete stray trains of this resource's own models near the player. |
| `sweepInterval` | `5000` | How often the sweep runs. |
| `sweepRadius` | `700.0` | Radius around the player the sweep looks at. |

A train that is unloaded on every machine cannot be deleted by any client, so a delete
order can be lost and leave an unowned train standing on the track. The sweep closes
that gap: it runs before every spawn and every `sweepInterval` afterwards.

Turn it off only if another resource spawns trains from the same train configs, as
described in [Installation](/customer-docs/resources/dusk-rails/installation/).

## Debug

| Setting | Default | Purpose |
|---|---|---|
| `debug` | `false` | Registers the `railsdebug` client command and logs sweep results. |

Turn it on while you build your own lines, turn it back off before you go live. The
command is described in [Troubleshooting](/customer-docs/resources/dusk-rails/troubleshooting/).

## Framework load events

| Setting | Purpose |
|---|---|
| `readyEvents` | Events that mark a player as loaded and therefore as a spawn candidate. |

Ships with VORP, RSG, QBR and ox. See [Installation](/customer-docs/resources/dusk-rails/installation/).
