---
title: Aether Cat
description: Cat ears and a cat tail for RedM, tintable from a 32 colour palette.
---

`aether_cat` gives a player a pair of cat ears and a tail. The props attach to the
ped, take a colour from a 32 row palette, and can be nudged into place in game.
The tail carries its own joint chain and its own animation, both shipped inside
the resource: no prop pack, no animation resource, no shared dependency.

## Features

- **Self-contained models** — the YFT props, their ytyp and the tail animation all ship with the resource.
- **Engine driven tail** — the tail is a fragment with a four joint chain playing an animation authored for it. The script does not touch it per frame, so the cost does not grow with the number of wearers around you.
- **32 colours** — one palette baked into the model, picked from a menu that shows the actual colour.
- **Separate tint groups** — `ears` and `tail`, so a black cat can wear a white tail.
- **Server-checked colours** — `Config.Tint.allowed` decides what is offered, and the server rejects anything else no matter what a client sends.
- **Visible to everyone** — other players see the props, the colour, the motion and any custom placement.
- **Local colour preview** — hovering a swatch previews it on your own screen only; nothing replicates until you pick it.
- **Saved looks** — players can store their setup in the database and have it applied on join.
- **In-game fitting** — move each part live, then copy the finished values into `config.lua`.
- **Developer API** — server and client exports, so an inventory item can put it on and take it off.

## Quick facts

| | |
|---|---|
| Resource name | `aether_cat` |
| Version | 1.0.1 |
| Game | RedM (`rdr3`) |
| Framework | VORP, RSG, or standalone — detected automatically |
| Database | optional, `oxmysql` when saving is enabled |
| Models | `dusk_neko_ears`, `dusk_neko_tail` |
| Parts | `ears`, `tail` |
| Animation | `aether_cat_sway_v63`, bundled |
| Languages | `en`, `de`, `fr`, `pt`, `es`, `th` |

## Pages

- [Installation](/customer-docs/resources/aether-cat/installation/)
- [Configuration](/customer-docs/resources/aether-cat/configuration/)
- [Commands and menu](/customer-docs/resources/aether-cat/commands/)
- [Developer API](/customer-docs/resources/aether-cat/developers/)
- [Troubleshooting](/customer-docs/resources/aether-cat/troubleshooting/)
