---
title: Developer API
description: Server and client exports of aether_devilstail, and how to drive it from an inventory item.
---

Nothing here bypasses `Config.Permissions`. A player without `use` gets nothing,
no matter who calls.

## Server exports

`src` is the player's server ID.

| Export | Returns |
|---|---|
| `Toggle(src)` | `true` if the call went out |
| `SetActive(src, on)` | `true` if the call went out |
| `SetTint(src, index, group)` | `true` if the call went out |
| `SetPart(src, id, on)` | `true` if the call went out |
| `SetParts(src, map)` | `true` if every call went out |
| `ApplyPreset(src, name)` | `false` if the preset does not exist |
| `GetPreset(name)` | the preset table, or `nil` |
| `GetPresets()` | all presets |
| `HasPermission(src, node)` | boolean |

`true` means the request was sent and the player is allowed. The prop attaches one
frame later on the client, so do not treat it as "is wearing it now".

`SetPart` and `SetParts` switch single parts at runtime. `id` is a part id from
`Config.Sets`, so `tail` or `horns`:

```lua
exports.aether_devilstail:SetParts(src, { horns = true, tail = false })
exports.aether_devilstail:SetPart(src, 'horns', false)
```

## Client exports

For the local player.

| Export | Returns |
|---|---|
| `Toggle()` | the new state |
| `SetActive(on)` | the new state |
| `IsActive()` | boolean |
| `SetTint(index, group)` | `true` on success |
| `GetTint(group)` | the colour index |
| `ApplyPreset(name)` | `true` on success |
| `GetSet()` | the active set name |

## Driving it from an inventory item

The item handler runs on the server and knows the server ID, which is what the
server exports take. You create the item yourself: this resource creates no items
and writes to no item table.

VORP:

```lua
exports.vorp_inventory:registerUsableItem('devil_tail', function(data)
    if not data or not data.source then return end
    exports.aether_devilstail:Toggle(data.source)
end, GetCurrentResourceName())
```

RSG:

```lua
RSGCore.Functions.CreateUseableItem('devil_tail', function(src)
    exports.aether_devilstail:Toggle(src)
end)
```

Using the item again takes it off. For separate on and off items use
`SetActive(src, true)` and `SetActive(src, false)`.

## Colour indices and groups

`group` is a group id from `Config.TintGroups`, not a part id. Leave it out to
colour everything at once.

```lua
exports.aether_devilstail:SetTint(src, 16, 'horns')
```

Valid indices are `0` to `31`. `-1` stops applying a colour. The server rejects
anything outside `Config.Tint.allowed` and falls back to `Config.Tint.default`.

## Database

| Table | Holds |
|---|---|
| `aether_devilstail_loadout` | one saved look per character |
| `aether_devilstail_loadout_access` | the access list an admin manages in the menu |

The key is VORP's `charIdentifier`, RSG's `citizenid`, or the Rockstar licence
when neither is present.

**The table name follows the resource name.** If you rename the folder, the
resource points at a new empty table and the old one is left untouched. To keep
existing looks after a rename, name the old table explicitly:

```lua
Config.Save.table = 'old_folder_name_loadout'
```
