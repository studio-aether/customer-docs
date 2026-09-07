---
title: Aether Fae Wings
description: Fae wings for RedM, tintable from a 32 colour palette.
---

`aether_wings_fae` gives a player a pair of fae wings. The props attach to the ped, take a colour from a
32 row palette, and can be nudged into place in game. Everything streams inside
the resource: no prop pack, no shared dependency.

## Features

- **Self-contained models** — the YFT props and their ytyp ship with the resource.
- **32 colours** — one palette baked into the model, picked from a menu that shows the actual colour.
- **Separate tint groups** — one group, `wings`, covering both sides.
- **Server-checked colours** — `Config.Tint.allowed` decides what is offered, and the server rejects anything else no matter what a client sends.
- **Visible to everyone** — other players see the props, the colour and any custom placement.
- **Saved looks** — players can store their setup in the database and have it applied on join.
- **In-game fitting** — move each part live, then copy the finished values into `config.lua`.
- **Developer API** — server and client exports, so an inventory item can put it on and take it off.

## Quick facts

| | |
|---|---|
| Resource name | `aether_wings_fae` |
| Version | 1.0.0 |
| Game | RedM (`rdr3`) |
| Framework | VORP, RSG, or standalone — detected automatically |
| Database | optional, `oxmysql` when saving is enabled |
| Models | `dusk_wing_fae2_l`, `dusk_wing_fae2_r` |
| Parts | `wing_l`, `wing_r` |

## Pages

- [Installation](/resources/aether-wings-fae/installation/)
- [Configuration](/resources/aether-wings-fae/configuration/)
- [Commands and menu](/resources/aether-wings-fae/commands/)
- [Developer API](/resources/aether-wings-fae/developers/)
- [Troubleshooting](/resources/aether-wings-fae/troubleshooting/)
