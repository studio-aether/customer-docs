---
title: Aether Fae
description: "Aether Fae is a RedM resource that adds fae wings which bend while they beat, with three colour layers, saved looks and exports. For fantasy roleplay servers."
head:
  - tag: title
    content: "Aether Fae - RedM Animated Fae Wings | Studio Aether"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"SoftwareApplication\",\"name\":\"Aether Fae\",\"description\":\"Aether Fae is a RedM resource that adds fae wings which bend while they beat, with three colour layers, saved looks and exports. For fantasy roleplay servers.\",\"applicationCategory\":\"GameApplication\",\"operatingSystem\":\"RedM server (FXServer)\",\"url\":\"https://studio-aether.github.io/customer-docs/resources/aether-fae/\",\"publisher\":{\"@id\":\"https://studio-aether.tebex.io/#organization\"}}"
---

`aether_fae` gives a player a pair of fae wings. Each wing has five lobes, three on top and
two below, and every lobe hangs on its own chain of three joints. The wings beat once every
1.6 seconds, the lobes fold back one after another and bend from root to tip. Membrane,
veins and shimmer are coloured separately, and everyone nearby sees the same look.

## Features

- **Wings that bend while they beat.** The beat is an animation the game engine plays on the prop, shipped inside the resource.
- **Three colour layers**: membrane, veins and shimmer, each with its own tint group and 32 colours, previewed live in the menu.
- **Motion switch** in the menu, on Numpad 6 by default. The choice is saved with the look.
- **Menu with an orbit camera**, so you see the change while you make it.
- **Fine placement** for bodies and clothing that sit differently. Veins and shimmer follow the membrane.
- **Presets**: an admin saves a look by name and it applies for everyone without a restart.
- **Saved looks**: players get theirs back on join and can switch that off.
- **Permissions** in five nodes. VORP and RSG groups are detected, or use ACE.
- **Exports** for your own scripts, server and client.
- **Seven languages**, all editable.

## Quick facts

| | |
|---|---|
| Resource name | `aether_fae` |
| Version | 1.2.0 |
| Game | RedM (`rdr3`) |
| Framework | none required, VORP and RSG are detected |
| Database | `oxmysql`, only for saving looks |
| Languages | `en`, `de`, `fr`, `pt`, `es`, `th`, `it` |
| Models | `aether_fae2_m` (membrane), `aether_fae2_a` (veins and rim), `aether_fae2_s` (shimmer) |
| Animation | `aether_fae2_wing_v01` |
| Open after escrow | `config.lua`, `data/presets.lua`, `locales/*.lua`, `README.md`, `docs/DEVELOPERS.md` |

## Good to know

Model, texture and animation names are global. If another resource streams the same names,
stop it first. Players need a fresh connect after the resource is added or updated,
streamed assets only load on join.

Coming from `aether_wings_fae`? See
[Upgrading from aether_wings_fae](/customer-docs/resources/aether-fae/installation/#upgrading-from-aether_wings_fae).

## Requirements

- A RedM server (`rdr3`).
- No framework required, VORP and RSG are detected.
- `oxmysql` only for saving looks.

## Pages

- [Installation](/customer-docs/resources/aether-fae/installation/)
- [Configuration](/customer-docs/resources/aether-fae/configuration/)
- [Commands and menu](/customer-docs/resources/aether-fae/commands/)
- [Developer API](/customer-docs/resources/aether-fae/developers/)
- [Troubleshooting](/customer-docs/resources/aether-fae/troubleshooting/)
