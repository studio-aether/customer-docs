---
title: Aether Devils Tail
description: A devil tail and horns for RedM, tintable from a 32 colour palette.
---

`aether_devilstail` gives a player a devil tail and a pair of horns. The props
attach to the ped, take a colour from a 32 row palette, and can be nudged into
place in game. The tail carries its own joint chain and its own animation, both
shipped inside the resource: no prop pack, no animation resource, no shared
dependency.

## Features

- **Self-contained models** — the tail fragment, the horns, their ytyp files and the tail animation all ship with the resource.
- **Engine driven tail** — the tail is a fragment with a four joint chain playing an animation authored for it. The script does not touch it per frame, so the cost does not grow with the number of wearers around you.
- **32 colours** — one palette baked into the models, picked from a menu that shows the actual colour.
- **Separate tint groups** — `tail` and `horns`, so a red tail can sit under bone white horns.
- **Server-checked colours** — `Config.Tint.allowed` decides what is offered, and the server rejects anything else no matter what a client sends.
- **Visible to everyone** — other players see the props, the colour, the motion and any custom placement.
- **Local colour preview** — hovering a swatch previews it on your own screen only; nothing replicates until you pick it.
- **Saved looks** — players can store their setup in the database and have it applied on join.
- **In-game fitting** — move each part live, then copy the finished values into `config.lua`.
- **Developer API** — server and client exports, so an inventory item can put it on and take it off.

## Quick facts

| | |
|---|---|
| Resource name | `aether_devilstail` |
| Version | 1.0.11 |
| Game | RedM (`rdr3`) |
| Framework | VORP, RSG, or standalone — detected automatically |
| Database | optional, `oxmysql` when saving is enabled |
| Models | `dusk_tail`, `dusk_devil_horns` |
| Parts | `tail`, `horns` |
| Animation | `aether_devil_sway_v1`, bundled |
| Languages | `en`, `de`, `fr`, `pt`, `es`, `th` |

## Pages

- [Installation](/customer-docs/resources/aether-devilstail/installation/)
- [Configuration](/customer-docs/resources/aether-devilstail/configuration/)
- [Commands and menu](/customer-docs/resources/aether-devilstail/commands/)
- [Developer API](/customer-docs/resources/aether-devilstail/developers/)
- [Troubleshooting](/customer-docs/resources/aether-devilstail/troubleshooting/)
