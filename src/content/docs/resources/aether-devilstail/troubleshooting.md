---
title: Troubleshooting
description: What to check when aether_devilstail does not behave.
---

## The props are white

The ytyp is not reaching the model. Check that `stream/` still holds the model
files and both `.ytyp` files, and that nothing else on the server streams a model
of the same name. Two resources shipping the same model name is the usual cause.

## The tail does not move

The animation dictionary is not loading. Three causes, in the order worth
checking:

1. An older animation resource is still running and streams
   `aether_devil_sway_v1` under the same global name. Stop it. The dictionary
   ships inside `aether_devilstail` now.
2. `stream/aether_devil_sway_v1.ycd` is missing from the folder, or it was
   committed through a tool that rewrote its bytes. It is a binary file.
3. The request timed out. The resource retries on its own after a minute and
   says so in the console; it never blocks while waiting.

The props still appear in all three cases. A stiff tail is the symptom. The horns
never move: they are set to `motion = 'none'` on purpose.

## Nothing happens on `devilstail`

Another resource registered the same command and shadows it. Rename it in
`Config.Command`, restart, and check the server console for a duplicate warning.

## The colour does not change

1. `Config.Tint.enabled` has to be `true`.
2. The player needs the `tint` node.
3. `Config.Tint.allowed` has to contain the index. The server silently falls back
   to `Config.Tint.default` for anything else, which looks like the command was
   ignored.

## Old models after an update

A `restart` does not clear the client's streaming cache. Every player has to
reconnect once after the files change. If one player sees the new version and
another does not, this is why.

## Saving does nothing

`Config.Save.enabled` has to be on, `oxmysql` has to be running, and the player
needs the `save` node. Check the server console on start: the resource reports
whether it found the tables or created them.

## Looks disappeared after renaming the folder

The table name follows the resource name, so a rename points at a new empty
table. The old data is still there. Set it explicitly:

```lua
Config.Save.table = 'old_folder_name_loadout'
```

## Another player's colour is wrong for a moment

Hovering the palette previews locally and does not replicate. What others see is
the last colour that was actually picked. If a committed colour is not arriving
at all, check `Config.Sync.enabled` and the range below.

## Other players do not see it

`Config.Sync.enabled` has to be on. `range` is in metres and `maxWearers` caps
how many wearers are drawn at once, so in a crowd the furthest ones drop out
first. Both are in `config.lua`.
