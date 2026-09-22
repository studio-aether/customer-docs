---
title: Inventory items on VORP and RSG
description: Create a usable inventory item on VORP or RSG and use it to call the server exports of our resources.
---

## When you need this

Several of our resources ship server exports but create no items and write to no item
table: `aether_cat`, `aether_devilstail` and `aether_fogofwar`. The command and the menu work
out of the box. If you also want an item in the player's satchel that does the same thing,
for example cat ears that go on when the player uses them, you build that item yourself:

1. Create the item in your inventory (a row in the `items` table on VORP, an entry in the
   shared items on RSG).
2. Register it as usable in a small server script of your own.
3. In that handler, call our export with the player's server ID.

The handler runs on the server, and the server exports take the server ID, so no client code
is needed.

`dusk_knuckles` is the exception. It registers the use of its `knuckles` item itself, so you
only create the item and never register it a second time. On VORP, its `install.sql` creates
the item. On RSG, add `knuckles` to `rsg-core/shared/items.lua` as shown below: the item has
to exist when `dusk_knuckles` starts, otherwise the console shows
`knuckles < item does not exist in the core configuration` and the item stays unusable. See
[Dusk Knuckles installation](/customer-docs/resources/dusk-knuckles/installation/).

## A resource for your item handlers

Put every handler into one small resource of your own, for example `my_items`, with a
`server.lua` and this `fxmanifest.lua`:

```lua
fx_version 'cerulean'
game 'rdr3'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

lua54 'yes'

server_script 'server.lua'

dependencies {
    'vorp_inventory', -- on RSG: 'rsg-core'
}
```

In `server.cfg` it starts after the framework, the inventory and our resources:

```
ensure aether_cat
ensure aether_devilstail
ensure aether_fogofwar
ensure my_items
```

## VORP

### 1. Create the item

VORP reads its items from the `items` table. The columns of the current VORP schema are
`item`, `label`, `limit`, `can_remove`, `type`, `usable`, `useExpired`, `id`, `groupId`,
`rarityId`, `metadata`, `desc`, `degradation`, `durability`, `instructions` and `weight`.
Everything you leave out gets its default.

```sql
INSERT INTO items (item, label, `limit`, can_remove, type, usable, `desc`, weight, groupId, rarityId)
VALUES ('cat_ears', 'Cat Ears', 1, 1, 'item_standard', 1,
        'Soft ears and a tail. Use to put them on or take them off.',
        0.1, 1, 1)
ON DUPLICATE KEY UPDATE
    label = VALUES(label),
    usable = VALUES(usable),
    `desc` = VALUES(`desc`);
```

- `item` is the name every script uses. Keep it lowercase and write it the same way
  everywhere.
- `type` must be `item_standard`. The inventory only sends a use request for that type.
- `usable` must be `1`.
- `limit` and `desc` need backticks because they are reserved words in SQL.
- `groupId` and `rarityId` point to the `item_group` and `item_rarity` tables. `1` exists in
  a default install (`default` and `Common`).
- Older VORP databases have no `rarityId` column yet. If the insert fails on that column,
  remove `rarityId` and its value from the statement.

The icon goes to `vorp_inventory/html/img/items/cat_ears.png`, named exactly like the item.

VORP loads the `items` table once when `vorp_inventory` starts. Restart the server after the
insert, otherwise the new item does not exist for the inventory.

### 2. Register it as usable

```lua
exports.vorp_inventory:registerUsableItem('cat_ears', function(data)
    local src = data.source
    exports.vorp_inventory:closeInventory(src)
    exports.aether_cat:Toggle(src)
end, GetCurrentResourceName())
```

The signature is `registerUsableItem(item, callback, resource)`. The third argument only
names your resource in VORP's debug output.

The callback receives one table:

| Field | Holds |
|---|---|
| `data.source` | the player's server ID |
| `data.item.id` | the ID of the exact stack that was used |
| `data.item.name` | the item name |
| `data.item.count` | how many are in that stack |
| `data.item.metadata` | the item's metadata table |

`closeInventory(source)` is optional. VORP does not close the inventory on use by itself, so
without it the player sees the result only after closing the satchel.

### 3. Remove the item, if it is used up

Our exports never touch the inventory. If the item is a consumable, remove it in your
handler, and only after the export reported success:

```lua
exports.vorp_inventory:subItemById(src, data.item.id)
```

`subItemById(source, id, callback, allow, amount)` removes one from the stack that was used
and returns `true` or `false`. `subItem(source, item, amount)` removes by name instead.

## RSG

### 1. Create the item

Add an entry to `RSGShared.Items` in `rsg-core/shared/items.lua`, in the same form as the
entries around it:

```lua
cat_ears = { name = 'cat_ears', label = 'Cat Ears', weight = 100, type = 'item', image = 'cat_ears.png', unique = false, useable = true, shouldClose = true, description = 'Use to put them on or take them off.' },
```

- The key and `name` must be identical.
- `type = 'item'`. Weapons, thrown weapons and equipment are routed elsewhere and never reach
  a usable item handler.
- `useable = true` puts **Use** into the item's context menu.
- `shouldClose = true` closes the inventory when the item is used.
- `weight` uses the same scale as the other entries in the file.

The icon goes to `rsg-inventory/html/images/cat_ears.png`, matching `image`. Restart the
server afterwards.

Updating rsg-core replaces `items.lua` with the new version, and your entries with it. To keep
your items out of that file, add them from your own server script instead:

```lua
exports['rsg-core']:AddItem('cat_ears', {
    name = 'cat_ears', label = 'Cat Ears', weight = 100, type = 'item',
    image = 'cat_ears.png', unique = false, useable = true, shouldClose = true,
    description = 'Use to put them on or take them off.',
})
```

It returns `true` on success and `false` if the name is already taken. Items added this way
exist only while rsg-core runs, so your resource has to start after rsg-core, as the
`dependencies` block above ensures. Do not use this route for `knuckles`: `dusk_knuckles`
usually starts before your resource and would not find the item.

### 2. Register it as usable

```lua
local RSGCore = exports['rsg-core']:GetCoreObject()

RSGCore.Functions.CreateUseableItem('cat_ears', function(source, item)
    exports.aether_cat:Toggle(source)
end)
```

The callback receives the player's server ID and the used inventory entry. `item.slot` is
the slot, `item.amount` the stack size and `item.info` the metadata.

### 3. Remove the item, if it is used up

```lua
if exports['rsg-inventory']:RemoveItem(source, 'cat_ears', 1, item.slot, 'used') then
    TriggerClientEvent('rsg-inventory:client:ItemBox', source, RSGCore.Shared.Items['cat_ears'], 'remove', 1)
end
```

`RemoveItem(identifier, item, amount, slot, reason)` returns `true` or `false`. For a player,
`identifier` is the server ID. The `ItemBox` event shows the usual "removed" pop-up.

## Ready-made examples

All examples go into the `server.lua` of your handler resource. Pick the VORP or the RSG
block, not both. On RSG, the `RSGCore` line from above has to be at the top of the file.

### aether_cat: ears on and off

API reference: [Aether Cat developer API](/customer-docs/resources/aether-cat/developers/).

VORP:

```lua
exports.vorp_inventory:registerUsableItem('cat_ears', function(data)
    local src = data.source
    exports.vorp_inventory:closeInventory(src)
    exports.aether_cat:Toggle(src)
end, GetCurrentResourceName())
```

RSG:

```lua
RSGCore.Functions.CreateUseableItem('cat_ears', function(source, item)
    exports.aether_cat:Toggle(source)
end)
```

Using the item again takes the set off. The item stays in the satchel, so nothing is removed.

Separate items for on and off use `SetActive`:

```lua
exports.aether_cat:SetActive(src, true)  -- in the handler of the "on" item
exports.aether_cat:SetActive(src, false) -- in the handler of the "off" item
```

Ears without the tail: switch the parts first, then put the set on.

```lua
exports.aether_cat:SetParts(src, { ears = true, tail = false })
exports.aether_cat:SetActive(src, true)
```

### aether_devilstail: tail on and off

API reference: [Aether Devilstail developer API](/customer-docs/resources/aether-devilstail/developers/).

VORP:

```lua
exports.vorp_inventory:registerUsableItem('devil_tail', function(data)
    local src = data.source
    exports.vorp_inventory:closeInventory(src)
    exports.aether_devilstail:Toggle(src)
end, GetCurrentResourceName())
```

RSG:

```lua
RSGCore.Functions.CreateUseableItem('devil_tail', function(source, item)
    exports.aether_devilstail:Toggle(source)
end)
```

The part IDs are `tail` and `horns`. Horns only:

```lua
exports.aether_devilstail:SetParts(src, { horns = true, tail = false })
exports.aether_devilstail:SetActive(src, true)
```

### aether_fogofwar: reveal an area with a map

API reference: [Aether Fog of War for developers](/customer-docs/resources/aether-fog-of-war/developers/).

A map item uncovers a named region and is used up. First add the region to
`Config.Regions` in `aether_fogofwar/config.lua`, which ships empty. An entry has a `name`,
the `coords` of its centre and a `radius` in metres:

```lua
Config.Regions = {
    { name = 'valentine_area', coords = vector3(-275.0, 802.0, 119.0), radius = 1500.0 },
}
```

The handler removes the map only if it actually uncovered something new. `RevealRegion` also
returns `true` when the region was explored already, so the handler compares the explored
percentage before and after.

VORP:

```lua
exports.vorp_inventory:registerUsableItem('map_valentine', function(data)
    local src = data.source
    local before = exports.aether_fogofwar:GetExploredPercent(src)

    if not exports.aether_fogofwar:RevealRegion(src, 'valentine_area') then
        return
    end

    if exports.aether_fogofwar:GetExploredPercent(src) > before then
        exports.vorp_inventory:closeInventory(src)
        exports.vorp_inventory:subItemById(src, data.item.id)
    end
end, GetCurrentResourceName())
```

RSG:

```lua
RSGCore.Functions.CreateUseableItem('map_valentine', function(source, item)
    local before = exports.aether_fogofwar:GetExploredPercent(source)

    if not exports.aether_fogofwar:RevealRegion(source, 'valentine_area') then
        return
    end

    if exports.aether_fogofwar:GetExploredPercent(source) > before then
        if exports['rsg-inventory']:RemoveItem(source, 'map_valentine', 1, item.slot, 'map used') then
            TriggerClientEvent('rsg-inventory:client:ItemBox', source, RSGCore.Shared.Items['map_valentine'], 'remove', 1)
        end
    end
end)
```

A surveying kit that uncovers the area around the player works the same way with
`RevealArea`. Take the position from the server, never from the client:

```lua
local coords = GetEntityCoords(GetPlayerPed(src))
exports.aether_fogofwar:RevealArea(src, coords.x, coords.y, 1000.0)
```

`RevealRegion` and `RevealArea` return `false` if the player has no character loaded yet or
the region name is unknown. In that case nothing is removed.

## Common mistakes

**The item name is spelled differently in two places.** The name in the database or in
`items.lua`, the name in your handler and the icon file name must match exactly, including
case. About 15 seconds after `vorp_inventory` starts, VORP checks every registered item and
prints a warning containing `was added as usabled but does not exist in database` for each
name it cannot find (the typo is VORP's own).

**The item is not marked as usable.** On VORP, `usable` must be `1`, otherwise the same check
warns `is not set as usable in database`. The `type` must be `item_standard`, otherwise the
use click does nothing at all. On RSG, `useable = true` is what adds the **Use** entry.

**The item was added while the server was running.** VORP reads the `items` table when
`vorp_inventory` starts, and RSG reads `items.lua` when `rsg-core` starts. Restart the server
after adding items there.

**Wrong start order.** Your handler resource calls the inventory as soon as it loads. If it
starts before the inventory, the console shows
`No such export registerUsableItem in resource vorp_inventory` and the item is never
registered. The `dependencies` block in your manifest and `ensure my_items` at the end of
`server.cfg` prevent that.

**The inventory was restarted on its own.** Restarting `vorp_inventory` or `rsg-core` forgets
every registered item, and on RSG every item added through `AddItem`. Restart your handler
resource right after it, or restart the whole server.

**The same item is registered twice.** Only one handler per item wins. On VORP the last
registration replaces the earlier one and the console warns
`is being registered by multiple resources`. On RSG the later one replaces the earlier one
silently. `knuckles` is already registered by `dusk_knuckles`, so do not register it again.

**The item is not removed.** Our exports never add or remove items. If the item should be
used up, your handler removes it, and only after the export returned `true`. Wearable items
like `cat_ears` are normally not removed, so the player can take the set off with the same
item.

**The export returns `false`.** For `aether_cat` and `aether_devilstail` the player lacks the
`use` permission in `Config.Permissions`. For `aether_fogofwar` the player has no character
loaded yet, or the region name does not match an entry in `Config.Regions`.

**The item is expected to be the only way in.** The item is an extra way to trigger the
resource. The `neko` and `devilstail` commands stay available to everyone who has the `use`
permission.
