---
title: Installation
description: Requirements, start order and how the items and database schema set themselves up.
---

## Requirements

- A RedM server (`rdr3`).
- `jo_libs`, `oxmysql` and `xsound`. All three must be started before `aether_phonograph`.
- A framework supported by `jo_libs`.

## Setup

1. Copy `aether_phonograph` into your `resources` folder.
2. Make sure `jo_libs`, `oxmysql` and `xsound` are started before it, then add
   `ensure aether_phonograph` to `server.cfg`.
3. Restart the server.

There is no SQL file to run. On first start the resource creates its own tables
(`aether_phonographs` and `aether_phonograph_favourites`) and records applied migrations in
`aether_phonograph_migrations`.

## Items create themselves

Every device in `Config.Devices` names the item that places it (`item`, falling back to
`Config.Item`). On start, any of those slugs missing from your inventory table is inserted
using the definition in `Config.Items`. An item that already exists is never touched: no
update, no upsert, so a label, weight or limit you already changed survives every restart.

This only applies to frameworks that keep items in a database table. Frameworks that define
items in Lua files instead, RSG among them, have no such table; there nothing happens and you
register the slug yourself.

Set `Config.CreateItems = false` to keep this resource out of your item table entirely. It
then expects the slugs to already exist, and using a missing item simply does nothing.

If a newly created item is not usable yet, restart your inventory resource: it does not know
about an item created after it already loaded.

## Checking it works

Use the gramophone or radio item to enter placement mode. Aim at a surface, use the mouse
wheel to turn it and Shift plus the wheel to raise or lower it, then press E to place it.
Interact with the placed device to open its interface and start playback.

Run `phonoitems` in the server console at any time to see which item slugs are wanted, how
many were created and how many already existed.

## What stays open after escrow

`config.lua`, `locales/en.lua` and `locales/de.lua` are excluded from escrow. Everything you
are meant to change lives in `config.lua`; see
[Configuration](/customer-docs/resources/aether-phonograph/configuration/).
