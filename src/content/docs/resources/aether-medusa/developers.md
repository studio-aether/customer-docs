---
title: Developer API
description: Server and client exports of aether_medusa.
---

Nothing here bypasses `Config.Permissions`. A player without `use` gets nothing, no matter
who calls.

## Server exports

Call these from server code. `src` is the player's server ID.

| Export | Returns | Notes |
|---|---|---|
| `Toggle(src)` | `true` if the call went out | Puts it on if off, takes it off if on |
| `SetActive(src, on)` | `true` if the call went out | `on` is a boolean |
| `SetTint(src, index, group)` | `true` if the call went out | `group` is optional |
| `SetMotion(src, on)` | `true` if the call went out | `false` stops the snakes, `true` starts them again |
| `ApplyPreset(src, name)` | `false` if the preset does not exist | |
| `GetPreset(name)` | the preset table, or `nil` | Read-only |
| `GetPresets()` | all presets | Read-only |
| `HasPermission(src, node)` | boolean | `use`, `tint`, `save`, `gizmo`, `admin` |

`true` means the request was sent and the player is allowed. It does not mean the
hairstyle is on yet, that happens a moment later on the client.

```lua
exports.aether_medusa:Toggle(src)
exports.aether_medusa:SetActive(src, false)
exports.aether_medusa:SetTint(src, 16, 'hair')
```

## Client exports

Call these from client code, for the local player.

| Export | Returns |
|---|---|
| `Toggle()` | the new state |
| `SetActive(on)` | the new state |
| `IsActive()` | boolean |
| `SetTint(index, group)` | `true` on success |
| `GetTint(group)` | the colour index |
| `SetMotion(on)` | `true` on success |
| `GetMotion()` | boolean, `false` while the motion is off |
| `ToggleMotion()` | `true` on success |
| `ApplyPreset(name)` | `true` on success |
| `GetSet()` | the active set name |

## Colour zones

`group` is `hair` for the scales, `belly` or `heads`. Leave it out to colour everything at
once. Valid indices are `0` to `31`, matching `Config.Tint.rows`. `-1` stops applying a
colour. The server rejects anything outside `Config.Tint.allowed`.

```lua
exports.aether_medusa:SetTint(src, 16, 'hair')
exports.aether_medusa:SetTint(src, 23, 'heads')
```

## Switching the motion off

```lua
exports.aether_medusa:SetMotion(src, false)
```

The snakes rest still until `SetMotion(src, true)`. Everyone nearby sees the same. While
`Config.MotionSwitch` is on, a player who saves the look keeps the choice. Presets never
carry it.

## Wiring it to an inventory item

The item handler runs on the server and knows the server ID, which is what the server
exports take. You create the item yourself, this resource creates no items.

VORP:

```lua
exports.vorp_inventory:registerUsableItem('medusa_hair', function(data)
    if not data or not data.source then return end
    exports.aether_medusa:Toggle(data.source)
end, GetCurrentResourceName())
```

RSG:

```lua
RSGCore.Functions.CreateUseableItem('medusa_hair', function(src)
    exports.aether_medusa:Toggle(src)
end)
```

Using the item a second time takes it off again. For separate on and off items use
`SetActive(src, true)` and `SetActive(src, false)`. To hand out a saved look, store a
preset from the menu first, then:

```lua
exports.aether_medusa:ApplyPreset(src, 'my_variant')
```

## Database

Saved looks live in `aether_medusa_loadout`, the access list in
`aether_medusa_loadout_access`. Both are created on start while `Config.Save.autoCreate`
is on. The key is the character ID under VORP, the citizen ID under RSG, and the Rockstar
licence when neither is present.
