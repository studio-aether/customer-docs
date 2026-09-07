---
title: Troubleshooting
description: Reading the debug output, and the fault patterns worth knowing with their causes.
---

## The debug command

Set `debug = true` in `shared/config.lua`, then run this in the client console (F8):

```
railsdebug
```

It prints your own server id, and for every active line:

```
east: status=running netId=42 controller=3 halted=false
   entity=true control=false carriages=6 speed=13.87 at=1481,648 dist=204.3
   fork VALENTINE_TO_RHODES  TRAINS3  resolved=7 used=7 want=true
```

| Field | Meaning |
|---|---|
| `status` | `idle` (waiting for a player in range), `spawning` (a client holds the token), `running`. |
| `netId` | Network id of the published train, `nil` while not running. |
| `controller` | Server id of the client currently steering. Compare it with your own. |
| `halted` | The server is holding the train at a stop. |
| `entity` | Whether the train exists on your machine at all. |
| `control` | Whether your client owns the entity right now. |
| `resolved` / `used` | What the coordinate lookup found, and what the controller applies. |

`resolved=false` with a number in `used` means the fork is running on its fallback
`index`. `resolved=false` and `used=false` means that switch is not being set at all.

## Fault patterns

### No train appears

Check the status first. `idle` means no player is within `spawnRadius` of the spawn
point, or `respawnDelay` after a reset has not passed yet. If it stays `idle` while you
stand on the spawn point, your client never reported itself ready: your framework fires
a load event that is not in `readyEvents`, and the 60 second fallback has not hit yet.

`spawning` that never becomes `running` is a client failing the spawn. It gets a
`tokenPenalty` and the line moves on to the next player, so the symptom is a delay, not
a dead line.

### Two trains on one line

That is what `sweepGhosts` exists for, and if you see it, the sweep is off or the second
train came from another resource. A stray train from a lost delete order is removed
within `sweepInterval` once a player is within `sweepRadius` of it.

If you turned the sweep off to protect another train resource, this is the price: a
train that is unloaded on every machine at the moment the delete order goes out survives
it, and nothing cleans it up afterwards.

### The train takes a wrong turn

A fork for that junction is missing, has the wrong `state`, or did not resolve. Run
`railsdebug` and read the fork rows, then see
[Lines & junctions](/customer-docs/resources/dusk-rails/lines/).

If the train is diverted at a switch that no line lists, it belongs in `Rail.AutoForks`.

### The train stands at a station forever

The station hold is `stationWait` (45 s by default) and it runs on the server clock, so
it does not depend on the driving client staying connected. A train that never leaves is
a controller that stopped reporting: the server drops it after `controllerTimeout` and
another nearby client claims the line, which takes a few seconds.

If nobody is left to claim it, the line is reset after `orphanTimeout` and respawns at
its last position.

### The train disappears in front of me

Only if no player is within `despawnRadius` (1400 m) of it, which cannot be you. What
you are seeing is streaming: the entity leaves your range while the line keeps running.
With `blipRange = true` the blip stays on the map from the server position, so you can
tell the two apart. No blip at all means the line is not running.

### The blip is missing

In order: `blips` is the master switch, `blip = true` per line decides whether that line
has one, and there is no blip while a line is not running, because there is no train.

## What one player can still influence

The client that currently drives a line owns the train entity, and can therefore hold
its own train at a stop or affect where it respawns, within the bounds the server sets.
That is a nuisance on ambient traffic and nothing more: no money, inventory or character
data is touched anywhere in this resource, and a client cannot spawn a train, take over
a line it does not own, or move another train by asking the server for it.
