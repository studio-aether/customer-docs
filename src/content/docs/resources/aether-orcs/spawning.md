---
title: Spawn with your own script
description: A client function that spawns an orc or the ogre with the right outfit and size.
---

A model and its outfit belong together. The outfit number picks the character, so
`aether_orc_grimfang` with outfit 2 shows Ironjaw. Take the pair and the scale from the
table on the overview page.

## The function

Client side. It returns the ped, or `nil` if the model does not load.

```lua
local function spawnOrc(model, outfit, scale, x, y, z, heading)
    local hash = GetHashKey(model)
    RequestModel(hash, false)
    local started = GetGameTimer()
    while not HasModelLoaded(hash) do
        if GetGameTimer() - started > 15000 then return nil end
        Wait(50)
    end
    local ped = CreatePed(hash, x, y, z, heading, true, false, false, false)
    SetModelAsNoLongerNeeded(hash)
    Citizen.InvokeNative(0x77FF8D35EEC6BBC4, ped, outfit, false)
    Citizen.InvokeNative(0xCC8CA3E88256E58F, ped, true, true, true, true, false)
    Citizen.InvokeNative(0x25ACFC650B65C538, ped, scale)
    started = GetGameTimer()
    while Citizen.InvokeNative(0xA0BC8FAED8CFEB3C, ped, Citizen.ResultAsInteger()) == 0 do
        if GetGameTimer() - started > 10000 then break end
        Wait(50)
    end
    return ped
end
```

## A test command

```lua
RegisterCommand('orc', function()
    local p = GetEntityCoords(PlayerPedId())
    spawnOrc('aether_orc_ironhide', 1, 1.04, p.x + 2.0, p.y, p.z - 0.9, 0.0)
end, false)
```

Type `orc` in the console, without a slash. The ogre works the same way:
`spawnOrc('aether_ogre_grimhide', 3, 1.3627, ...)`.

## Size on other clients

Ped scale is not networked. Every client that should see the right size has to run the
scale call itself, and the engine drops it when the ped dies or is picked up. This matters
most for the ogre. For networked spawns use `aether_goblins`, which keeps the scale applied
on every client.
