---
title: Aether Fog of War
description: Persistent fog of war for RedM, drawn on the game's own fog layer and synced through the server.
---

`aether_fogofwar` adds a persistent fog of war for RedM. The map starts black and every
character uncovers it by riding through the world. Progress survives relog, server restart
and character switch.

This drives the engine's own fog of war layer, the one Red Dead Online uses for its mission
zones. There is no overlay texture, no NUI and no second map. The fog you see is the game's,
so it behaves like the game's: it fades at the edges, it works on the minimap and on the
pause map, and it costs nothing extra to render.

## Features

- Persistent exploration, per character or per account depending on `Config.PersistenceMode`.
- Grid-based state: the world is cut into cells of `Config.CellSize`, and one character's
  entire exploration state fits in a single base64 string, 1797 bytes at the default 100
  metre cell size.
- Batched sync: the client marks nearby cells locally as the player moves and sends them to
  the server in batches, instead of streaming a position every tick.
- Database writes happen on a background interval per dirty map, not once per batch, plus on
  player drop and on resource stop, so a player riding across the map does not produce a
  database write on every flush.
- Discovery rewards for towns, districts and states, validated against the player's
  server-side position rather than the position the client reports; each key pays out once
  per character.
- Guarma handled separately: entering it switches the minimap zone and hides the fog layer,
  leaving it switches back, and cells in Guarma are never recorded.
- Five languages ship with the resource: English, German, French, Spanish and Portuguese.
- Server and client exports to reveal areas or named regions, reset a player's map, and
  check explored state or percentage from your own scripts.
- An admin command to reveal, peek, reset or print stats for any character.

## Requirements

- A RedM server (`rdr3`).
- `jo_libs` (framework bridge and notifications) and `oxmysql`.
- A framework detected automatically by `jo_libs`: VORP, RSG, QBR, RPX, FRP, TPZ or RedEM.

The database schema is created and migrated by the resource itself on start.

## Quick facts

| | |
|---|---|
| Resource name | `aether_fogofwar` |
| Version | 1.0.0 |
| Game | RedM (`rdr3`) |
| Dependencies | `jo_libs`, `oxmysql` |
| Framework | VORP, RSG, QBR, RPX, FRP, TPZ, RedEM, detected automatically |
| Database | `oxmysql`, schema self-applies on start |
| Languages | `en`, `de`, `fr`, `es`, `pt` |
| Open after escrow | `config.lua`, `config/locales/*.lua`, `README.md` |

## Pages

- [Installation](/customer-docs/resources/aether-fog-of-war/installation/)
- [Configuration](/customer-docs/resources/aether-fog-of-war/configuration/)
- [Commands](/customer-docs/resources/aether-fog-of-war/commands/)
- [For developers](/customer-docs/resources/aether-fog-of-war/developers/)
- [Troubleshooting](/customer-docs/resources/aether-fog-of-war/troubleshooting/)
