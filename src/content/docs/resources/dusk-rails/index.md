---
title: Dusk Rails
description: Ambient rail traffic for RedM with server-authoritative state. No framework, no dependencies, no database.
---

`dusk_rails` runs the trains and the Saint Denis tram as ambient world traffic, with
the server owning every piece of state that matters: line status, network id, current
controller, station timer and the junction plan. Clients only execute what the server
already decided.

Exactly one client spawns a train, exactly one client steers it, and a control handover
carries no state, because the state never lived on the client. That is why a driver
disconnecting mid-route does not leave a ghost train or a stuck line.

## Features

- **Server-authoritative** All line state lives in `GlobalState`, written by the server only. A client cannot spawn, stop or move a train by asking for it.
- **No dependencies** No framework, no `ox_lib`, no database, no SQL import. Drop it in and it runs.
- **Ownership-following control** The controller role is re-checked every second against the real entity owner, so RedM's ownership migration is followed instead of fought.
- **Ghost sweep** Trains that survive a lost delete order are removed on sight, so a line never ends up with two trains on the same track.
- **Long-range blips** A train blip stays on the map from the server position while the train is outside your streaming range.
- **Junctions by coordinates** Forks are resolved at runtime from coordinates and cached. No hardcoded junction indices to maintain, with an explicit index as fallback.
- **Per-line switch** `enabled = false` removes a line before anything else sees it: no state, no spawn token, no blip, no sweep.

## Quick facts

| | |
|---|---|
| Resource name | `dusk_rails` |
| Version | 1.1.0 |
| Game | RedM (`rdr3`) |
| Dependencies | none |
| Framework | none required |
| Database | none |
| OneSync | **required** |
| Open after escrow | `shared/config.lua`, `README.md` |

## Shipped lines

| Line | `id` | Default | What it is |
|---|---|---|---|
| Eastern Line | `east` | enabled | Freight train on the eastern network, from Saint Denis outward |
| Saint Denis Tram | `tram` | enabled | City tram with passengers |
| Western Line | `west` | disabled | Second train on the old west tracks, flip `enabled` to run it |

## Pages

- [Installation](/customer-docs/resources/dusk-rails/installation/)
- [Configuration](/customer-docs/resources/dusk-rails/configuration/)
- [Lines & junctions](/customer-docs/resources/dusk-rails/lines/)
- [Troubleshooting](/customer-docs/resources/dusk-rails/troubleshooting/)
- [For developers](/customer-docs/resources/dusk-rails/developers/)
