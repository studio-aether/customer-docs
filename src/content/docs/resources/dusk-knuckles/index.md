---
title: Dusk Knuckles
description: "Dusk Knuckles is a RedM resource that adds equippable knuckle dusters: a hand prop with its own model plus an unarmed damage bonus. Built on jo_libs."
head:
  - tag: title
    content: "Dusk Knuckles - RedM Knuckle Dusters with Unarmed Damage | Studio Aether"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"SoftwareApplication\",\"name\":\"Dusk Knuckles\",\"description\":\"Dusk Knuckles is a RedM resource that adds equippable knuckle dusters: a hand prop with its own model plus an unarmed damage bonus. Built on jo_libs.\",\"applicationCategory\":\"GameApplication\",\"operatingSystem\":\"RedM server (FXServer)\",\"url\":\"https://studio-aether.github.io/customer-docs/resources/dusk-knuckles/\",\"publisher\":{\"@id\":\"https://studio-aether.tebex.io/#organization\"},\"sameAs\":[\"https://studio-aether.tebex.io/package/knuckles\"]}"
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

## Requirements

- A RedM server (`rdr3`).
- `jo_libs` (framework bridge and notifications).
- The item `knuckles`, created by `install.sql` on VORP.

## Store

[Dusk Knuckles on the Studio Aether store](https://studio-aether.tebex.io/package/knuckles)

## Pages

- [Installation](/customer-docs/resources/dusk-knuckles/installation/)
- [Configuration](/customer-docs/resources/dusk-knuckles/configuration/)
- [Fitting & commands](/customer-docs/resources/dusk-knuckles/commands/)
- [Other frameworks](/customer-docs/resources/dusk-knuckles/frameworks/)
- [Troubleshooting](/customer-docs/resources/dusk-knuckles/troubleshooting/)
