---
title: Troubleshooting
description: What to check when aether_wings_fae does not behave.
---

## The props are white

The ytyp is not reaching the model. Check that `stream/` still holds both the
model files and the `.ytyp`, and that nothing else on the server streams a model
of the same name. Two resources shipping the same model name is the usual cause.

## Nothing happens on `faewings`

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

## Other players do not see it

`Config.Sync.enabled` has to be on. `range` is in metres and `maxWearers` caps
how many wearers are drawn at once, so in a crowd the furthest ones drop out
first. Both are in `config.lua`.
