---
title: Troubleshooting
description: What to check when aether_fae does not behave.
---

## Nothing happens on `faewings`

Check the node in `Config.Permissions`. With `everyone = false` the player needs the ACE
node or a framework group listed in `groups`. If another resource registered the same
command, rename it in `Config.Command`.

## The wings do not show up, or an old version stays active

Players need a fresh connect after the resource is added, streamed assets only load on
join. After an update, replace the whole `aether_fae` folder, copy your own `config.lua`
back and run `restart aether_fae`. If one player sees the new version and another does
not, the second has not reconnected yet.

Model, texture and animation names are global. If another resource streams
`aether_fae2_m`, `aether_fae2_a`, `aether_fae2_s` or `aether_fae2_wing_v01`, stop it first.

## The wings stand still

The motion is switched off. Check the Motion row in the menu and the Numpad 6 key. A look
saved with the motion off keeps it off. The wings then rest open.

## Looks are not saved

Saving needs `oxmysql` and `Config.Save.enabled`, and the player needs the `save` node.
Make sure `oxmysql` starts before `aether_fae` in `server.cfg`. The server console prints
`oxmysql is not running, saving is disabled.` when it is missing.

## Looks disappeared after an upgrade or a rename

The table name follows the resource name, so a rename points the resource at a new, empty
table. The old one is left untouched. Set its name explicitly:

```lua
Config.Save.table = 'old_resource_name_loadout'
```

For `aether_wings_fae` this is `'aether_wings_fae_loadout'`. See
[Installation](/customer-docs/resources/aether-fae/installation/#upgrading-from-aether_wings_fae).

## Other players do not see the wings

`Config.Sync.enabled` has to be on. The wearer may be outside `Config.Sync.range`, or
`Config.Sync.maxWearers` is reached on the viewing client. Raise either value, mind the
cost on a crowded server.

## A colour is refused

`Config.Tint.allowed` does not include it. The server rejects every other index and falls
back to `Config.Tint.default`.

## Menu text is in the wrong language

A key missing from the chosen language falls back to English. Check `Config.Locale`.
