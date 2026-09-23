---
title: Dusk Throwables
description: Server-authoritative throwables for RedM, dynamite, poison gas bottle, fire bottle and a throwing rock.
---

`dusk_throwables` adds throwable items for RedM with the server deciding whether a throw
or a detonation is real. A client can send whatever it wants after that, but it never gets
more than one detonation per item it actually paid for, and never one the server did not
authorise.

Two models ship inside the resource and stream themselves, so no separate prop pack is
needed.

## Features

- Server-authoritative arming, throwing and detonation. The server takes the item, tracks
  the state and only then allows a detonation; the throw type always comes from the item
  registration, never from a client payload.
- Four throwables shipped: dynamite, a poison gas bottle, a fire bottle and a throwing rock
  that hits instead of exploding.
- Own grenade models: `dusk_grenade_mk2` and `dusk_grenade_gas` stream with the resource.
- Visible to everyone. Other players see the object in your hand and its flight, without a
  networked hand object: only the flying carrier is networked.
- Timing and distance checks on the server: throw distance, flight time and a detonation in
  the hand are all checked against how long that is physically possible for the configured
  values.
- Safe zones checked on both sides: the client refuses the throw with a message, the server
  refuses the explosion independently of what the client did.
- Custom throwables and hit-only objects can be added in `config.lua` without touching code.

## Requirements

- A RedM server (`rdr3`).
- `jo_libs`, started after the framework core and before this resource.
- A framework supported by `jo_libs`: VORP, RSG (v1/v2), RedEM:RP (alt/2023), QBR, QR, RPX,
  TPZ or FRP.

No database and no SQL file are used.

## Quick facts

| | |
|---|---|
| Resource name | `dusk_throwables` |
| Version | 1.1.0 |
| Game | RedM (`rdr3`) |
| Dependencies | `jo_libs` |
| Database | none |
| Models shipped | `dusk_grenade_mk2`, `dusk_grenade_gas` |
| Open after escrow | `config.lua`, `server/bridge.lua`, `README.md` |

## Shipped throwables

| Item | Effect | Model in hand |
|---|---|---|
| `throw_dynamite` | Fuse starts on aim, explodes even in the hand | `dusk_grenade_mk2` |
| `throw_poisonbottle` | Ignites on impact, leaves a poison gas cloud | `dusk_grenade_gas` |
| `throw_firebottle` | Ignites on impact, fire explosion | `dusk_grenade_gas` |
| `throw_rock` | No explosion, damages whatever it hits | `p_campfirerocksml01x` |

The item names carry the `throw_` prefix on purpose: `dynamite` alone is already used as a
crafting ingredient on many servers.

## Controls

- Use the item: the throwable appears in your hand.
- Hold right mouse button: aim. For dynamite the fuse starts the moment you aim.
- Hold left mouse button: charge the throw in three stages, release to throw.
- Weapon wheel or holster key: put the throwable away, the item is returned.

One item equals one throw. Putting the weapon away without throwing returns the item.

## Pages

- [Installation](/customer-docs/resources/dusk-throwables/installation/)
- [Configuration](/customer-docs/resources/dusk-throwables/configuration/)
- [Troubleshooting](/customer-docs/resources/dusk-throwables/troubleshooting/)
