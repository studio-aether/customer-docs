---
title: Dusk Knuckles
description: Equippable knuckles for RedM — a hand prop plus an unarmed damage bonus, shipping its own model.
---

`dusk_knuckles` lets a player equip a knuckle duster. Using the item attaches a custom
prop to the player's hand and raises unarmed damage; using it again takes the knuckles
off. The model ships inside the resource, so no extra prop pack is required.

## Features

- **Self-contained model** — the `.ydr` streams with the resource, nothing else to install.
- **Unarmed damage bonus** — a configurable multiplier applied to `GROUP_UNARMED` (optionally `GROUP_MELEE`).
- **Server-authoritative state** — the multiplier is clamped on the server, a client can never raise it.
- **Ownership revalidation** — if the item leaves the inventory by any route, the knuckles come off.
- **In-game fitting tools** — live-adjust bone, offset and rotation, then copy the finished values into `config.lua`.
- **Escrow-friendly** — `config.lua`, `server/bridge.lua`, `install.sql` and this README stay readable after escrow.

## Quick facts

| | |
|---|---|
| Resource name | `dusk_knuckles` |
| Version | 0.5.0 |
| Game | RedM (`rdr3`) |
| Framework | [`jo_libs`](https://github.com/Jump-On-Studios/RedM-jo_libs) (bridge + notifications) |
| Required item | `knuckles` (created by `install.sql` on VORP) |

## Pages

- [Installation](/resources/dusk-knuckles/installation/)
- [Configuration](/resources/dusk-knuckles/configuration/)
- [Fitting & commands](/resources/dusk-knuckles/commands/)
- [Other frameworks](/resources/dusk-knuckles/frameworks/)
- [Troubleshooting](/resources/dusk-knuckles/troubleshooting/)
