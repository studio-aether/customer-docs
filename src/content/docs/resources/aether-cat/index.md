---
title: Aether Cat
description: Cat ears and a cat tail for RedM, tintable from a 32 colour palette.
---

`aether_cat` gives a player a pair of cat ears and a two piece tail. The props attach to the ped, take a colour from a
32 row palette, and can be nudged into place in game. Everything streams inside
the resource: no prop pack, no shared dependency.

## Features

- **Self-contained models** — the YFT props and their ytyp ship with the resource.
- **32 colours** — one palette baked into the model, picked from a menu that shows the actual colour.
- **Separate tint groups** — `ears` and `tail`, so a black cat can wear a white tail.
- **Server-checked colours** — `Config.Tint.allowed` decides what is offered, and the server rejects anything else no matter what a client sends.
- **Visible to everyone** — other players see the props, the colour and any custom placement.
- **Saved looks** — players can store their setup in the database and have it applied on join.
- **In-game fitting** — move each part live, then copy the finished values into `config.lua`.
- **Developer API** — server and client exports, so an inventory item can put it on and take it off.

## Quick facts

| | |
|---|---|
| Resource name | `aether_cat` |
| Version | 1.0.0 |
| Game | RedM (`rdr3`) |
| Framework | VORP, RSG, or standalone — detected automatically |
| Database | optional, `oxmysql` when saving is enabled |
| Models | `dusk_neko_ears`, `dusk_neko_tail`, `dusk_neko_tailtip` |
| Parts | `ears`, `tail`, `tailtip` |

## Pages

- [Installation](/resources/aether-cat/installation/)
- [Configuration](/resources/aether-cat/configuration/)
- [Commands and menu](/resources/aether-cat/commands/)
- [Developer API](/resources/aether-cat/developers/)
- [Troubleshooting](/resources/aether-cat/troubleshooting/)
