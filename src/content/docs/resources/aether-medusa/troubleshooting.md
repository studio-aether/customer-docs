---
title: Troubleshooting
description: What to check when aether_medusa does not behave.
---

## Nothing happens on `medusa`

Check the node in `Config.Permissions`. With `everyone = false` the player needs the ACE
node or a framework group listed in `groups`. If another resource registered the same
command, rename it in `Config.Command`.

## The hairstyle does not show up, or an old version stays active

Players need a fresh connect after the resource is added, streamed assets only load on
join. After an update, replace the whole `aether_medusa` folder, copy your own
`config.lua` back and run `restart aether_medusa`. If old files stay active, clear the
`cache/` folder of the server and start the resource again.

## The snakes stand still

The motion is switched off. Check the Motion row in the menu. A look saved with the motion
off keeps it off.

## Looks are not saved

Saving needs `oxmysql` and `Config.Save.enabled`. Make sure `oxmysql` starts before
`aether_medusa` in `server.cfg`. After renaming the resource folder the old looks sit in
the old table, set `Config.Save.table` to its name.

## Other players do not see the look

The wearer is outside `Config.Sync.range`, or `Config.Sync.maxWearers` is reached on the
viewing client. Raise either value, mind the cost on a crowded server.

## A colour is refused

`Config.Tint.allowed` does not include it. The server rejects every other index.

## Menu text is in the wrong language

A key missing from the chosen language falls back to English. Add the key to your
`locales/<code>.lua`.
