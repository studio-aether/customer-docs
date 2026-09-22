---
title: Troubleshooting
description: What to check when aether_fogofwar does not behave.
---

## Progress reset after a config change

If a player's map looks freshly black even though they had explored a lot, check whether
`Config.MapBounds` or `Config.CellSize` changed. Both together form a signature stored with
every saved map; when it no longer matches, stored progress is discarded on next load instead
of being drawn wrong. Decide on the grid before you go live, and treat changing it afterwards
as a reset for every character.

## A discovery does not pay out

- `Config.Discoveries.enabled` has to be `true`.
- The zone type has to be listed in `Config.Discoveries.zoneTypes` (`1` towns, `10`
  districts, `0` states).
- The reported position has to be within `Config.Discoveries.maxDistance` of the player's
  actual server-side position; a discovery further away is rejected.
- A given zone key only pays out once per character, enforced by the database, so a repeat
  visit is expected to do nothing.

## A modified client claims a discovery it should not

Only the client resolves coordinates to a map zone, so a modified client can in principle
claim a zone key while standing somewhere else. The server still checks the reported position
against its own copy of that player's position, but only against `Discoveries.maxDistance`,
not against which zone the position is actually in. With the default reward table this is
worth a few dollars. For larger rewards, gate them through your own content and the
`aether_fogofwar:discovered` event instead of raising the numbers in
`Config.Discoveries.rewards`.

## Guarma still shows fog, or does not

`Config.HandleGuarma` has to be `true` for the minimap zone switch and the tracking pause to
happen. Cells in Guarma are never recorded either way.

## The admin command does nothing

`Config.AdminCommand` (default `fog`) has to not be shadowed by another resource, and a
player running it needs the `Config.AdminAce` ACE (default `aether_fogofwar.admin`). From the
server console a `playerId` argument is required; from a player's own console it defaults to
that player.

## A character stopped updating

Check `Config.FullRevealPercent`. Above that percentage of the grid explored, a character is
marked fully explored and stops being tracked. `0` disables this entirely.
