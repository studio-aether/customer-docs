---
title: Troubleshooting
description: Debug commands, fault patterns and known limits of dusk_throwables.
---

## Debug commands

Set `Config.Debug = true`, then run these in the client console (F8):

| Command | Does |
|---|---|
| `tanim <clip> [flag]` | Plays an animation clip from `mech_weapons_thrown@base` on the player, with an optional flag (default `2`). |
| `tdrop [type] [local]` | Drops a throwable of the given type (default `throw_dynamite`) in front of the player and reports in the console whether it settles on the ground. Add `local` as a second argument to spawn it unnetworked. |
| `tdrop clear` | Removes test objects of any shipped model within 200 m of the player. |

`tdrop` is the collision test for custom models: it reports the start height, whether
collision was loaded, and after it settles, whether it landed close to the ground.

Turn `Debug` back off before you go live.

## Fault patterns

### Model does not appear

`IsModelInCdimage` returns `false` if the client was already connected before the resource
started. Reconnect once.

### Prop is white or has no texture

Another resource streams a model with the same name. Check `resources` for a duplicate
`dusk_grenade_*`.

### Nothing happens when using the item

The item name registered in the framework does not match the `item` field for that
throwable in `config.lua`, or `jo_libs` starts after this resource.

## Known limits

- The poison gas cloud damages players only, not NPCs.
- A hit from an `impact` throwable is executed only by the throwing player's client. This is
  by design: otherwise every client in range would trigger the same hit and the damage would
  multiply.
- A player whose client does not execute the detonation takes no damage from it. This applies
  to any client-side damage source in RedM, not only this resource.
- The game has no throw animations while mounted or in cover, so a throwable cannot be used
  meaningfully in either state.
- Dying while a throwable is already burning in the hand loses the item. This is intentional:
  otherwise dying would be a way to get a lit item back.
- If the inventory is full when an item is refunded, the item is lost. The player is notified
  and the loss is logged.
- A thrown object whose detonation never reaches the server is refunded after
  `MaxFlightTime`. The player gets the item back, and the explosion does not happen.
