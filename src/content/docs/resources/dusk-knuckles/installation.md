---
title: Installation
description: Requirements and setup steps for dusk_knuckles.
---

## Requirements

- A RedM server (`rdr3`).
- [`jo_libs`](https://github.com/Jump-On-Studios/RedM-jo_libs) — used for the framework bridge and notifications.
- An inventory item named `knuckles` (see step 3).

## Setup

1. Copy `dusk_knuckles` into your `resources` folder.
2. Add `ensure dusk_knuckles` to `server.cfg`, **after** `jo_libs`.
3. Run `install.sql` against your server database.
   - On **VORP** this creates the `knuckles` item directly.
   - On another core, create an item named `knuckles` the way that core expects instead.
4. Copy `icon/knuckles.png` into your inventory's item image folder.
   On VORP that is `vorp_inventory/html/img/items/`.
5. Restart the server. **Clients have to reconnect once** so the new model reaches their streaming cache.

## Escrow note

Only the customer-facing surface stays readable after escrow: `config.lua`,
`server/bridge.lua`, `install.sql` and the README. Everything else is compiled.
