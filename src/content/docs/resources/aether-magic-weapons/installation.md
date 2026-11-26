---
title: Installation
description: Requirements and setup for aether_magicweapons.
---

## Requirements

- A RedM server (`rdr3`) with OneSync.
- `vorp_core`, `vorp_inventory` and `oxmysql`.

## Setup

1. Copy `aether_magicweapons` into your `resources` folder.
2. Add `ensure aether_magicweapons` to `server.cfg`, after `oxmysql`, `vorp_core` and
   `vorp_inventory`.
3. Start the server. The resource creates its items in the `items` table by itself.
4. Restart the server once. `vorp_inventory` reads the `items` table only when it starts.

## Updating

Replace the whole `aether_magicweapons` folder, do not merge it. Back up your `config.lua` and
any changed locale files first and copy them back afterwards.

## Checking it works

1. Give yourself an item, for example `mw_frost_dagger`, with the VORP admin tools.
2. Use it from the inventory. The knife appears in your hand with a snow aura.
3. Hit an NPC. It slows down and a burst of snow appears on it.
4. Use the item again to dismiss the weapon.

For the bows, carry arrows in your VORP inventory: the magic bows shoot your own arrows.

## Test command

`config.lua` has an optional test command that summons a weapon without the item. It is off by
default. Switch it on with `Config.TestCommand.enabled = true` or with this line in
`server.cfg`:

```
set aether_magicweapons_test true
```

The command is restricted: a player needs the ACE `command.mwtest` (or `command`). Usage:
`mwtest mw_fire_sword`.
