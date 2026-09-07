---
title: Lines & junctions
description: How a line is defined, how forks are resolved, and how to add a route of your own.
---

A line is one entry in `Rail.Lines` in `shared/config.lua`. Three ship with the resource:
`east` and `tram` are enabled, `west` is present but off.

## Line fields

| Field | Meaning |
|---|---|
| `id` | Internal key. Must be unique, and is what shows up in the debug output. |
| `label` | Blip name shown on the map. |
| `enabled` | `false` takes the line out of the resource entirely. |
| `config` | Train config hash. Decides the locomotive, the carriages and how many there are. |
| `spawn` | Spawn coordinates on the track. |
| `heading` | Direction boolean handed to the spawn native. Flip it if the train sets off the wrong way. |
| `speed` | Cruise speed. Values above 29.9 are capped. |
| `blip` | Whether this line carries a blip. |
| `passengers` | Spawn the passengers that belong to the train config. |
| `forks` | Junctions along the route, see below. |
| `stops` | Extra stop coordinates on top of the stations the game already knows. |

The speed ceiling is not a preference. Above roughly 30 the train outruns its own track
streaming and starts jumping the rails, so the value is clamped for you.

### Which lines run

`enabled = false` removes a line before anything else sees it: the server never builds
state for it, never hands out a spawn token, no client blips for it, and the ghost sweep
does not learn its train models. It is a real off switch, not a hidden line.

Shipped default is one train plus one tram. Set `enabled = true` on `west` if you want a
second train on the old west tracks.

## Forks

Every junction the route passes needs an entry, or the game decides for you and the
train ends up on a parallel track.

```lua
{ name = 'VALENTINE_TO_RHODES', track = 'TRAINS3', at = vector3(31.57, -29.41, 102.32), state = true }
```

| Field | Meaning |
|---|---|
| `name` | Free text. Only used in the debug output, so name it after the place. |
| `track` | Track config name as a string, or its hash as a number. |
| `at` | Coordinates of the junction. |
| `state` | The switch position this line wants. |
| `index` | Optional. Junction index, used when the coordinate lookup fails. |

The junction index is resolved at runtime from the coordinates and then cached, so you
do not have to hunt indices down for a normal route. A fork that does not resolve falls
back to `index`; if there is none, it is retried the next time the train passes.

The shipped `tram` line carries explicit indices on purpose: its junctions sit close
enough together that the coordinate lookup is not reliable there.

A switch is applied when the train is within `junctionApply` (25 m) of the fork, by the
client that currently drives the line.

### Forced junctions

`Rail.AutoForks` holds junctions that are forced every two seconds on every client,
regardless of any line plan. They exist for the switches that divert a passing train
onto a wrong parallel track no matter which line is running.

```lua
Rail.AutoForks = {
    { track = 'TRAINS_OLD_WEST01', index = 0, state = true },
    { track = 'TRAINS_OLD_WEST01', index = 1, state = true }
}
```

These take an index directly, not coordinates.

## Stops

Trains stop at the stations the game already knows. `stops` adds your own:

```lua
stops = {
    vector3(565.44, 1707.59, 187.47)
}
```

A custom stop triggers within 12 m of the coordinate and holds the train by setting its
cruise speed to zero, so it does not play the station animation set that a real station
does. The hold itself is timed on the server (`stationWait`), so no two clients can
fight over stopping and restarting.

## Adding a line

1. Copy an existing entry in `Rail.Lines` and give it a unique `id` and a `label`.
2. Set `spawn` to a point on the track, and `config` to the train config you want.
3. Walk or ride the route and note the coordinates of every junction it passes. Each one
   becomes a `forks` entry with the `state` your route needs.
4. Set `debug = true` and start the line.
5. In the client console (F8), run:

   ```
   railsdebug
   ```

   Per line you get the published status, the network id, the current controller,
   whether your own client holds the entity, and one row per fork.

6. Check the fork rows. `resolved=` is what the runtime lookup found, `used=` is what
   the controller actually applies. If `resolved=false`, give that fork an explicit
   `index`.
7. Turn `debug` back off before you go live.

If the train sets off in the wrong direction, flip `heading`. If it takes a wrong turn,
the fork for that junction is either missing, has the wrong `state`, or did not resolve.
