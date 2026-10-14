---
title: Aether Demon Wings
description: "Aether Demon Wings is a RedM resource that adds demon wings, tintable from a 32 colour palette. For dark fantasy roleplay, VORP, RSG or standalone."
head:
  - tag: title
    content: "Aether Demon Wings - RedM Demon Wings Cosmetic | Studio Aether"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"SoftwareApplication\",\"name\":\"Aether Demon Wings\",\"description\":\"Aether Demon Wings is a RedM resource that adds demon wings, tintable from a 32 colour palette. For dark fantasy roleplay, VORP, RSG or standalone.\",\"applicationCategory\":\"GameApplication\",\"operatingSystem\":\"RedM server (FXServer)\",\"url\":\"https://studio-aether.github.io/customer-docs/resources/aether-wings-demon/\",\"publisher\":{\"@id\":\"https://studio-aether.tebex.io/#organization\"}}"
---

`aether_wings_demon` gives a player a pair of demon wings. The props attach to the ped, take a colour from a
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
| Resource name | `aether_wings_demon` |
| Version | 1.0.0 |
| Game | RedM (`rdr3`) |
| Framework | VORP, RSG, or standalone — detected automatically |
| Database | optional, `oxmysql` when saving is enabled |
| Models | `dusk_wing_dem_l`, `dusk_wing_dem_r` |
| Parts | `wing_l`, `wing_r` |

## Requirements

- A RedM server (`rdr3`).
- VORP, RSG or standalone, detected automatically.
- `oxmysql` only when saving is enabled.

## Pages

- [Installation](/customer-docs/resources/aether-wings-demon/installation/)
- [Configuration](/customer-docs/resources/aether-wings-demon/configuration/)
- [Commands and menu](/customer-docs/resources/aether-wings-demon/commands/)
- [Developer API](/customer-docs/resources/aether-wings-demon/developers/)
- [Troubleshooting](/customer-docs/resources/aether-wings-demon/troubleshooting/)
