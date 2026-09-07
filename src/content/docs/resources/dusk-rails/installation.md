---
title: Installation
description: Requirements, first start and the two settings that matter before you go live with dusk_rails.
---

## Requirements

- A RedM server (`rdr3`).
- **OneSync.** Not optional. The whole design rests on the server writing `GlobalState`
  and every client reading the same truth from it. Without OneSync there is no shared
  state, and the resource has nothing to coordinate with.

There is nothing else. No framework, no `ox_lib`, no `oxmysql`, no SQL file, no items.

## First start

The server publishes the line plan roughly half a second after the resource starts.
Nothing spawns yet: a line only spawns once a player is within `spawnRadius` (800 m by
default) of its spawn point, and it is removed again once every player is further away
than `despawnRadius` (1400 m). An empty map runs no trains.

When a line is removed that way, its position is kept. The next spawn happens where the
train left off, not back at the start of the route.

## Framework load events

A player only becomes a spawn candidate after their character is actually in the world.
`Rail.Config.readyEvents` lists the events that mark that moment:

```lua
readyEvents = {
    'vorp:SelectedCharacter',
    'RSGCore:Client:OnPlayerLoaded',
    'QBCore:Client:OnPlayerLoaded',
    'ox:playerLoaded'
}
```

VORP, RSG, QBR and ox are covered. If you run something else, add its load event here.
There is a fallback: 60 seconds after joining, a client reports itself ready regardless.
Without a matching event your players simply become spawn candidates a minute later than
they could, which on a busy server is invisible and on an empty one is a minute without
a train.

## Running another train resource alongside

`sweepGhosts` deletes stray trains near the player that use a **model from the train
configs of your own active lines** and are not the published train of a running line.
It skips the vehicle the player is sitting in, skips every carriage of a live line, and
pauses completely while any line is spawning.

If another resource on your server spawns trains from those same configs, its trains
match that filter and will be removed. Set `sweepGhosts = false` in that case, and read
[Troubleshooting](/customer-docs/resources/dusk-rails/troubleshooting/) for what you give
up by doing so.

## What stays open after escrow

`shared/config.lua` and `README.md` are excluded from escrow. Everything you are meant
to change lives in that config file, including the full line definitions. See
[Configuration](/customer-docs/resources/dusk-rails/configuration/).
