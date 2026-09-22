---
title: Installation
description: Requirements, start order and the two things that break a live update.
---

## Requirements

- A RedM server (`rdr3`).
- `jo_libs`. It must be started after your framework core and before `dusk_throwables`.
- A framework supported by `jo_libs`: VORP, RSG (v1/v2), RedEM:RP (alt/2023), QBR, QR, RPX,
  TPZ or FRP.

```
ensure vorp_core
ensure jo_libs
ensure dusk_throwables
```

There is no database and no SQL file to run.

## Replacing the old prop pack

If you previously used the separate `dusk_grenades` prop pack, remove it. Two resources
streaming the same model names collide, and which one wins is not predictable.

## First start

After the first start, every client has to reconnect once so the two shipped models
(`dusk_grenade_mk2`, `dusk_grenade_gas`) land in their streaming cache. A client that was
already connected when the resource started will not see the models until it reconnects.

## Do not restart this resource live

The resource streams its models through `DLC_ITYP_REQUEST`, and RAGE will not release those
archetypes while an object of that type still exists in the world. The resource deletes its
own objects when it stops, which covers everything it can see, but an object currently held
in another player's hand cannot be removed by it. Restarting the resource right after that
can crash the client with `RAGE error: failed to unload DLC_ITYP_REQUEST`.

Roll out updates through a full server restart, not through `restart dusk_throwables`.

## Creating the items

Register four items in your framework's inventory. The item names come from
`Config.Throwables` in `config.lua` and can be changed there:

| Item | Effect | Model in hand |
|---|---|---|
| `throw_dynamite` | Fuse starts on aim, explodes even in the hand | `dusk_grenade_mk2` |
| `throw_poisonbottle` | Ignites on impact, leaves a poison gas cloud | `dusk_grenade_gas` |
| `throw_firebottle` | Ignites on impact, fire explosion | `dusk_grenade_gas` |
| `throw_rock` | No explosion, damages whatever it hits | `p_campfirerocksml01x` |

There is no command that hands out items. Items always come from the framework's own
inventory.

## What stays open after escrow

`config.lua`, `server/bridge.lua` and `README.md` are excluded from escrow. Everything you
are meant to change lives in `config.lua`. See
[Configuration](/customer-docs/resources/dusk-throwables/configuration/).
