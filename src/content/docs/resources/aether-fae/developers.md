---
title: Developer API
description: Server and client exports of aether_fae.
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
| `SetPart(src, id, on)` | `true` if the call went out | Puts one part on or off at runtime, `id` is a part id from `Config.Sets` such as `wings` |
| `SetParts(src, map)` | `true` if every call went out | Several at once: `{ wings = false }` |
| `SetMotion(src, on)` | `true` if the call went out | `false` stops the wing motion, `true` starts it again |
| `ApplyPreset(src, name)` | `false` if the preset does not exist | Preset names come from `data/presets.lua` |
| `GetPreset(name)` | the preset table, or `nil` | Read-only |
| `GetPresets()` | all presets | Read-only |
| `HasPermission(src, node)` | boolean | `use`, `tint`, `save`, `gizmo`, `admin` |

`true` means the request was sent and the player is allowed. It does not mean the prop is
attached yet, that happens a moment later on the client.

```lua
exports.aether_fae:Toggle(src)
exports.aether_fae:SetActive(src, false)
exports.aether_fae:SetTint(src, 16)
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
| `SetPart(id, on)` | `true` on success, `false` for an unknown id |
| `GetPart(id)` | boolean, whether the part is on the player right now, `nil` for an unknown id |
| `GetParts()` | table of part id to boolean |
| `SetMotion(on)` | `true` on success |
| `GetMotion()` | boolean, `false` while the motion is off |
| `ToggleMotion()` | `true` on success, `false` while the set cannot switch its motion |
| `ApplyPreset(name)` | `true` on success |
| `GetSet()` | the active set name |

## Colour groups

`group` is a tint group id from `Config.TintGroups`, not a part id. Leave it out to colour
everything at once. The wings have three groups: `membrane`, `veins` and `shimmer`.

```lua
exports.aether_fae:SetTint(src, 16, 'membrane')
exports.aether_fae:SetTint(src, 23, 'veins')
```

Valid indices are `0` to `31`, matching `Config.Tint.rows`. `-1` stops applying a colour
and leaves the texture as it is. The server rejects anything outside
`Config.Tint.allowed` and falls back to `Config.Tint.default`.

## Driving parts from another script

Every part in `Config.Sets` can be switched on and off per player at runtime, on top of the
owner switch `enabled` in the config. A part with `default = false` starts off and waits for
a script. It gets no switch in the menu and its state is never saved, so call it again on
join if your script owns it. Every other part also has a switch in the menu while
`Config.PartSwitches` is on, and a player who turns one off and saves the outfit finds it
off after the next join. Presets never carry the choice. Either way the state is synced to
everyone nearby.

```lua
-- a class or ability script hands out the wings
exports.aether_fae:SetParts(src, { wings = true })
exports.aether_fae:SetActive(src, true)

-- later the wings go
exports.aether_fae:SetPart(src, 'wings', false)
```

`SetPart` before `SetActive` only stores the choice, the next `SetActive(src, true)` spawns
with it. Attached parts (`attachTo`) follow their host: a hidden host hides them too. In
the default set `veins` and `shimmer` are attached to `wings`.

## Switching the motion off

`SetMotion(src, false)` stops every moving part of the player. A part with
`motion = 'anim'` plays no clip and rests in the pose of the model, a part with script
motion (`wing`, `ear`, `sway`) stays in its configured position. The moving parts are
rebuilt once when the state changes, nothing else. `true` starts the motion again.
Everyone nearby sees the same.

```lua
-- the wings rest while the player sits at a table
exports.aether_fae:SetMotion(src, false)
```

While `Config.MotionSwitch` is on, the menu shows a Motion row for sets with at least one
moving part, and a player who saves the outfit keeps the choice. Presets never carry it.
With the switch off in the config the export still works for the session, but the state is
not saved and a stored look loads with the motion on.

## Wiring it to an inventory item

The item handler runs on the server and knows the server ID, which is what the server
exports take. You create the item yourself, this resource creates no items and writes to no
item table.

VORP:

```lua
exports.vorp_inventory:registerUsableItem('fae_wings', function(data)
    if not data or not data.source then return end
    exports.aether_fae:Toggle(data.source)
end, GetCurrentResourceName())
```

RSG:

```lua
RSGCore.Functions.CreateUseableItem('fae_wings', function(src)
    exports.aether_fae:Toggle(src)
end)
```

Using the item a second time takes it off again. For separate on and off items use
`SetActive(src, true)` and `SetActive(src, false)`. To make an item apply a saved look,
store a preset through **Export** in the menu first, then:

```lua
exports.aether_fae:ApplyPreset(src, 'my_variant')
```

## Events

The resource listens on `aether_fae:remote` on the client. It is triggered by the server
exports above and is not meant to be called directly. A player who fires it at themselves
gains nothing, the same permission checks run.

## Database

Saved looks live in `aether_fae_loadout`, the access list in `aether_fae_loadout_access`.
Both are created on start while `Config.Save.autoCreate` is on. The key is the character ID
under VORP, the citizen ID under RSG, and the Rockstar licence when neither is present.

The table name follows the resource name. Renaming the folder points the resource at a new,
empty table and leaves the old one untouched. To keep existing looks, set the old name:

```lua
Config.Save.table = 'old_resource_name_loadout'
```
