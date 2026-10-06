---
title: Troubleshooting
description: What to check when aether_goblins does not behave.
---

## Nothing happens on `goblins`

The player is missing the ACE node. Check that `server.cfg` grants
`aether_goblins.spawn` to the right group and restart the server. If another resource
registered the same command, rename it in `Config.Commands`.

## The goblins do not show up after the first install

The first install needs a full server restart, a resource restart is not enough.

## An ambush point never fires

1. `Config.Ambush.enabled` has to be `true`.
2. `chance` is a percentage rolled once per entry into the radius. A low value means most
   entries do nothing. Use `goblinambush test <nr>` to fire the point on yourself.
3. The point is on cooldown. `cooldown` is in seconds.
4. `Config.Ambush.maxActive` ambushes are already running.
5. The `coords` are not where you think. Stand on the spot and run `goblinambush pos`.

## Fewer goblins than asked for

`Config.Limits` caps each spawn, each player and the whole server. `goblin info` shows
where you stand against them.

## Goblins disappear

Ambushes remove themselves after `Config.Ambush.despawnAfter` seconds, and dead goblins
after `Config.CorpseSeconds`. Raise either value in `config.lua`.

## Grimfang and the Shaman do not move their faces

Known limit. These two have no face animation.
