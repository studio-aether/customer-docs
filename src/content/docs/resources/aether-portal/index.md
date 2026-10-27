---
title: Aether Portal
description: "Aether Portal is a RedM resource with a stone portal whose rune ring spins up, glows and teleports players. Framework independent, with prompts, commands and exports."
head:
  - tag: title
    content: "Aether Portal - RedM Teleport Portal with Spinning Rune Ring | Studio Aether"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"SoftwareApplication\",\"name\":\"Aether Portal\",\"description\":\"Aether Portal is a RedM resource with a stone portal whose rune ring spins up, glows and teleports players. Framework independent, with prompts, commands and exports.\",\"applicationCategory\":\"GameApplication\",\"operatingSystem\":\"RedM server (FXServer)\",\"url\":\"https://studio-aether.github.io/customer-docs/resources/aether-portal/\",\"publisher\":{\"@id\":\"https://studio-aether.tebex.io/#organization\"}}"
---

`aether_portal` places a carved stone portal in the world. When it is switched on, the inner
rune ring spins up, the runes start to glow and a vortex forms in the opening. Players step
up, hold E and arrive at the destination behind a screen fade. Switched off, the ring slows
down until it rests in its start position.

## Features

- **One model, its own animation** — frame, ring and runes are a single streamed model. The
  ring turns through an animation authored for it, so the script does not move anything per
  frame.
- **Spin up and spin down** — the ring accelerates when the portal opens and decelerates into
  its rest position when it closes, without a jump.
- **Glowing runes** — the runes only light up while the portal is active, at day and at night.
- **Vortex and light** — particle vortex and a light inside the ring while active.
- **Teleport with fade** — collision at the destination is loaded before the fade lifts, also
  on horseback.
- **Three use modes** — hold-E prompt, walk in, or export only for your own interaction.
- **Place in game** — admin commands place a portal at your position and set its destination,
  and print the line for `config.lua`.
- **Developer API** — server exports add, remove and switch portals; client exports trigger a
  portal and read its state; an event fires on every use.
- **Shared state** — every player sees the same portal open and close.

## Quick facts

| | |
|---|---|
| Resource name | `aether_portal` |
| Version | 1.0.0 |
| Game | RedM (`rdr3`) |
| Framework | none required, runs on VORP, RSG or standalone |
| Database | none |
| Model | `aether_portal`, bundled |
| Animations | bundled |
| Open after escrow | `config.lua` |

## Requirements

- A RedM server (`rdr3`) with OneSync.

## Pages

- [Installation](/customer-docs/resources/aether-portal/installation/)
- [Configuration](/customer-docs/resources/aether-portal/configuration/)
- [Commands](/customer-docs/resources/aether-portal/commands/)
- [Developers](/customer-docs/resources/aether-portal/developers/)
- [Troubleshooting](/customer-docs/resources/aether-portal/troubleshooting/)
- [Changelog](/customer-docs/resources/aether-portal/changelog/)
