---
title: Installation
description: Requirements and first start for aether_fogofwar.
---

## Requirements

- A RedM server (`rdr3`).
- `jo_libs` (framework bridge and notifications) and `oxmysql`.
- No framework setting is needed. The framework itself is detected at runtime by `jo_libs`:
  VORP, RSG, QBR, RPX, FRP, TPZ and RedEM are all covered without a setting.

## Setup

1. Copy `aether_fogofwar` into your `resources` folder.
2. Make sure `jo_libs` and `oxmysql` are started before it, then add
   `ensure aether_fogofwar` to `server.cfg`.
3. Restart the server.

There is no SQL file to run. The two database tables
(`aether_fogofwar_exploration`, `aether_fogofwar_discoveries`) are created and migrated by
the resource itself on start.

## Deciding the grid before you go live

`Config.MapBounds` and `Config.CellSize` form a signature that is stored with every saved
map. If you change either one after players have already explored, their stored progress no
longer describes the same world and is discarded on next load rather than drawn wrong.
Decide on the grid before you go live.

## What stays open after escrow

`config.lua`, the five files under `config/locales/` and `README.md` are excluded from
escrow. Everything you are meant to change lives in `config.lua`; see
[Configuration](/customer-docs/resources/aether-fog-of-war/configuration/).
