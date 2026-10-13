---
title: For developers
description: Server and client exports of aether_fogofwar, and the discovered event.
---

## Server exports

```lua
exports.aether_fogofwar:RevealArea(src, x, y, radius)
exports.aether_fogofwar:RevealRegion(src, 'name')
exports.aether_fogofwar:ResetPlayer(src)
exports.aether_fogofwar:IsExplored(src, x, y)
exports.aether_fogofwar:GetExploredPercent(src)
```

| Export | Returns |
|---|---|
| `RevealArea(src, x, y, radius)` | `true` if the reveal was applied, `false` if the player is not tracked or the arguments are invalid. |
| `RevealRegion(src, name)` | `true` if the named region was found and revealed, `false` otherwise. Reads from `Config.Regions`, which ships empty. |
| `ResetPlayer(src)` | `true` after wiping that player's stored exploration and discoveries. |
| `IsExplored(src, x, y)` | `true` if the cell at that coordinate is already explored, or if the player is fully explored. |
| `GetExploredPercent(src)` | The explored percentage as a number from `0.0` to `100.0`. |

`RevealArea` and `RevealRegion` send only the newly revealed cells to that player, so they
can be called during a mission without the client rebuilding its whole map.

## Client exports

```lua
exports.aether_fogofwar:IsExplored(x, y)
exports.aether_fogofwar:IsActive()
```

Both return `true` when the resource is not currently tracking that player, so a caller
using them to hide blips fails open instead of hiding everything.

## The discovered event

```lua
AddEventHandler('aether_fogofwar:discovered', function(source, owner, key)
    -- your own reward logic
end)
```

Fired on the server after a discovery is stored, with the player's server id, their `owner`
string and the zone `key`. This is the hook for your own rewards if you want more than
`Config.Discoveries.rewards` money payouts, for example a large reward tied to content your
own script already gates.

## The owner string

Both exports and the event use an `owner` string rather than a server id, since exploration
is stored per character or per account, not per connection:

- `c:<charid>` when `Config.PersistenceMode = 'character'`.
- `a:<identifier>` when `Config.PersistenceMode = 'account'`.

## What the server trusts and what it does not

The cells a client reports through its normal flush are taken at face value. That is
deliberate: they carry no value on their own, a client that lies about them only reveals its
own map, and the alternative is streaming every player position through the server at sample
rate.

Discovery rewards are checked, since that is where money changes hands. The server takes the
player's position from its own entity state, not from the message, and rejects the discovery
if the reported position is more than `Discoveries.maxDistance` away from it. The cell under
that server-side position is marked explored by the server itself, so a discovery never
depends on a flush having arrived first. Every key must be one of the known map zones, and
every key pays out once per character, enforced by a primary key in the database rather than
by the in-memory cache.

What a modified client can still do is claim a zone key while standing in a different zone,
because only the client resolves coordinates to a map zone. With the default reward table
that is worth a few dollars. If you attach large rewards to discoveries, attach them to zones
your own content already gates, or pay out from your own script through the `discovered`
event instead of `Config.Discoveries.rewards`.
