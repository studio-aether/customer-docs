---
title: Developers
description: Server and client exports and the use event of aether_portal.
---

## Server exports

```lua
exports.aether_portal:AddPortal('mine', {
    label = 'Mine',
    coords = vector3(2715.0, 1356.0, 69.0),
    heading = 90.0,
    destination = vector4(-1800.0, -400.0, 158.0, 0.0),
    active = true,
    use = 'export',
})
```

| Export | Returns |
|---|---|
| `AddPortal(id, def)` | `true` on success. Creates a portal or replaces one added by export; ids from `config.lua` are refused. |
| `RemovePortal(id)` | `true` if a portal added by export or command was removed |
| `SetActive(id, state)` | `true` if the portal exists; works for every portal |
| `IsActive(id)` | whether the portal is open |
| `GetPortals()` | table of all portals with position, destination, use mode, state and whether they come from `config.lua` |

`def` takes the same fields as an entry in `Config.Portals`.

## Client exports

| Export | Returns |
|---|---|
| `Use(id)` | Triggers the portal for the local player. `true` if it is open, loaded and nothing else is running. |
| `GetNearest()` | id and distance of the nearest loaded portal |
| `GetPromptTarget()` | id of the portal whose prompt is shown right now, otherwise `nil` |
| `GetEntity(id)` | object handle of the loaded portal, for example for a target system |
| `IsActive(id)` | whether the portal is open |
| `GetPortals()` | all portals with position, destination, use mode, state and whether they are loaded |

## The used event

```lua
AddEventHandler('aether_portal:used', function(id)
end)

AddEventHandler('aether_portal:used', function(src, id)
end)
```

The first handler runs on the client, the second on the server. Both fire on every use. The
server only fires its event when the portal is open and the player stands within
`Config.Use.maxServerDistance` of it.

A portal without `destination` does not teleport. The event is then the place for your own
logic, for example moving the player into a routing bucket or starting a scene.

## Own interaction

Give the portal `use = 'export'` so no prompt or zone of this resource gets in the way, then
call `exports.aether_portal:Use(id)` from your menu, item or target option. `GetEntity(id)`
returns the object once the player is within `Config.StreamDistance`.

```lua
exports.aether_portal:SetActive('mine', true)
SetTimeout(60000, function() exports.aether_portal:SetActive('mine', false) end)
```
