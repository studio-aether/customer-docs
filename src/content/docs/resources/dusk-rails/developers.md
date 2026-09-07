---
title: For developers
description: The two GlobalState keys dusk_rails publishes, and how to read them from your own resource.
---

The state of every line is public and replicated. If you want a station board, a
timetable NUI, a train robbery script or a conductor job, you read it from
`GlobalState`. Both keys are written by the server only and are readable on the client
and on the server.

## `GlobalState.rails`

A table keyed by line `id`:

```lua
{
    east = {
        status     = 'running',   -- 'idle' | 'spawning' | 'running'
        netId      = 42,          -- nil while not running
        controller = 3,           -- server id of the client steering, or nil
        halted     = false,       -- server is holding the train at a stop
        forks      = { ... }      -- the junction plan of that line
    }
}
```

## `GlobalState.railsPos`

The last reported position per line, as `{ x, y, z }`. A line that is not running has no
entry.

```lua
{ east = { 1481.5, 648.35, 91.52 } }
```

Positions arrive at most every `reportInterval` and only when the train actually moved
more than `positionDelta`, so treat them as a coarse track, not a live feed.

## Reading it

```lua
local function trainPosition(id)
    local line = (GlobalState.rails or {})[id]
    if not line or line.status ~= 'running' then return nil end

    local netId = line.netId
    if netId and NetworkDoesNetworkIdExist(netId) then
        local veh = NetToVeh(netId)
        if veh ~= 0 and DoesEntityExist(veh) then
            return GetEntityCoords(veh), veh
        end
    end

    local pos = (GlobalState.railsPos or {})[id]
    if pos then return vector3(pos[1], pos[2], pos[3]) end
end
```

The network id only resolves to an entity while the train is streamed to that client.
Everywhere else, `railsPos` is what you have. That split is exactly how the long-range
blip works.

## What not to do

Do not drive the train from your own resource. Speed, junctions, station holds and
respawns are decided by the server and executed by the one client holding the line, and
a second writer is the one thing this design does not tolerate. Reading is free.

The network events are validated against the real entity owner on the server, so they
are not a usable API for anything but the resource itself.
