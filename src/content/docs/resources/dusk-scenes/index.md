---
title: Dusk Scenes
description: World scenes for RedM — notes, props, corpses and particle effects with live preview before placing.
---

`dusk_scenes` is a world-scene tool for RedM: players place text notes, props, corpses
and particle effects into the world, with a live semi-transparent preview before
committing. It is framework-agnostic (VORP, RSG, QBR, ox_core or standalone) and only
requires `ox_lib` + `oxmysql`.

## Features

- **Live preview (ghost)** — the real model appears semi-transparent at the target and follows your aim. What you see is exactly what gets saved.
- **Five scene kinds** — text notes, props, corpses (peds), particle effects and decals.
- **Framework-agnostic** — auto-detects VORP / RSG / QBR / ox_core, falls back to standalone (Rockstar-license ownership + ACE admin).
- **Self-healing database** — one table, created and migrated automatically on startup. Nothing to import by hand.
- **Discord webhook** — queued, batched moderation log that never blocks a player request.
- **Escrow-friendly** — three files stay open after escrow and cover everything a server needs to change.
- **Built for scale** — one grid tick streams all scenes; cost does not grow with the number of placed scenes.

## Quick facts

| | |
|---|---|
| Resource name | `dusk_scenes` |
| Version | 0.9.0 |
| Game | RedM (`rdr3`) |
| Dependencies | [`ox_lib`](https://github.com/overextended/ox_lib), [`oxmysql`](https://github.com/overextended/oxmysql) |
| Framework | auto-detected — none required |

## Pages

- [Installation](/resources/dusk-scenes/installation/)
- [Configuration](/resources/dusk-scenes/configuration/)
- [Catalog](/resources/dusk-scenes/catalog/)
- [Commands & controls](/resources/dusk-scenes/commands/)
- [Troubleshooting & performance](/resources/dusk-scenes/troubleshooting/)
