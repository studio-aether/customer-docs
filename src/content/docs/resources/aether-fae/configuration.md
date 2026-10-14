---
title: Configuration
description: Every option in config.lua for aether_fae.
---

Everything lives in `config.lua`, which stays readable after escrow, together with
`data/presets.lua` and the language files.

## Framework and commands

```lua
Config.Framework = 'auto'
Config.Locale = 'en'
Config.Command = 'faewings'
Config.MenuCommand = 'faewingsmenu'
```

| Option | Meaning |
|---|---|
| `Framework` | `auto` detects VORP or RSG, otherwise set `ace` or list players in `Config.Admins` |
| `Locale` | language, see below |
| `Command` | the main command |
| `MenuCommand` | the command that opens the menu |

## Permissions

```lua
Config.Permissions = {
    use   = { ace = 'aether_fae.use',   groups = { 'user', 'admin' }, everyone = true },
    tint  = { ace = 'aether_fae.tint',  groups = { 'user', 'admin' }, everyone = true },
    save  = { ace = 'aether_fae.save',  groups = { 'user', 'admin' }, everyone = true },
    gizmo = { ace = 'aether_fae.gizmo', groups = { 'admin' },         everyone = true },
    admin = { ace = 'aether_fae.admin', groups = { 'admin' },         everyone = false },
}
```

| Node | Allows |
|---|---|
| `use` | putting the wings on and taking them off, presets, reset |
| `tint` | changing colours |
| `save` | saving a look |
| `gizmo` | adjusting the placement |
| `admin` | presets (Export) and the access list |

A node is granted when `everyone` is `true`, when the player holds the ACE node, or when
the framework group or job is in `groups`. One match is enough. Out of the box everything
except `admin` is open to every player. Set `everyone = false` to restrict a node, then
grant it in `server.cfg`:

```
add_ace group.admin aether_fae.admin allow
```

Players without a framework group can be made admins by Discord or game identifier:

```lua
Config.Admins = {
    discord = { },
    identifiers = { },
}
```

Discord IDs go in as digits under `discord`. Anything else goes under `identifiers` in the
format `GetPlayerIdentifiers` returns, for example `license:abc123...`. An entry in either
list grants all the nodes.

`admin` is enforced on the server, because that is where presets are created and deleted.
`use`, `tint` and `gizmo` are answered by the server but enforced on the client, so a
modified client can wear and tint regardless. For an attachment prop there is no way around
that.

## Saving looks

```lua
Config.Save = {
    enabled = true,
    autoCreate = true,
    table = nil,
    saveOnAttach = false,
    applyOnJoin = true,
    playerChoice = true,
}
```

| Option | Meaning |
|---|---|
| `enabled` | switches saving on or off, needs `oxmysql` |
| `autoCreate` | creates the tables on start |
| `table` | table name override, see below |
| `saveOnAttach` | saves the look every time it is put on |
| `applyOnJoin` | applies a saved look when the player joins |
| `playerChoice` | lets the player switch applying on join off |

The table name follows the resource name: `aether_fae_loadout`, and
`aether_fae_loadout_access` for the access list. Renaming the folder points the resource at
a new, empty table and leaves the old one untouched. To keep existing looks, set the old
name in `table`, for example `'old_resource_name_loadout'`.

## Colours

```lua
Config.Tint = { enabled = true, perRow = 8, default = 18, allowed = 'all', rows = { ... } }

Config.TintGroups = {
    { id = 'membrane', label = 'Membrane', parts = { 'wings' },   default = 19 },
    { id = 'veins',    label = 'Veins',    parts = { 'veins' },   default = 23 },
    { id = 'shimmer',  label = 'Shimmer',  parts = { 'shimmer' }, default = 25 },
}
```

| Option | Meaning |
|---|---|
| `Tint.enabled` | switches colouring on or off |
| `Tint.perRow` | colours per row in the menu |
| `Tint.default` | starting colour |
| `Tint.allowed` | `'all'`, or a list of indices the server accepts |
| `Tint.rows` | the 32 colours, index `0` to `31`, with the name and the swatch shown in the menu |
| `TintGroups` | the three layers and the starting colour of each |

The server rejects any colour outside `Tint.allowed`, whatever a client sends. The colour
comes from the palette baked into the model, not from the texture, so `rows` only names the
colours and sets the swatch shown in the menu. The menu lists the palette as four rows of
eight.

## Sets and parts

```lua
Config.DefaultSet = 'fae2'
Config.PartSwitches = true
```

The default set `fae2` has three parts: `wings` (model `aether_fae2_m`, on `SKEL_Spine3`),
`veins` (`aether_fae2_a`) and `shimmer` (`aether_fae2_s`). Veins and shimmer are attached
to `wings` with `attachTo = 'wings'` and follow every adjustment. Each part has an
`offset` and `rotation`, and `animSpeed` changes the pace of the beat. `PartSwitches`
shows per part switches in the menu.

## Motion

```lua
Config.MotionSwitch = true
Config.MotionKey = { enabled = true, key = 0x66 }
```

| Option | Meaning |
|---|---|
| `MotionSwitch` | shows the Motion row in the menu and keeps the choice with the saved look |
| `MotionKey.enabled` | turns the motion hotkey on |
| `MotionKey.key` | the Windows virtual key code, `0x66` is Numpad 6 |

With the motion off the wings rest open. Everyone nearby sees the same.

## Visibility to other players

```lua
Config.Sync = { enabled = true, range = 45.0, scanInterval = 900, moveInterval = 60, maxWearers = 12 }
```

| Option | Meaning |
|---|---|
| `enabled` | shows the look to other players |
| `range` | distance in metres within which other wearers are shown |
| `scanInterval` | milliseconds between player scans |
| `moveInterval` | milliseconds between remote motion updates |
| `maxWearers` | how many other wearers one client shows at once |

Every drawn wearer adds one prop, which is what `range` and `maxWearers` limit. Lower them
on a crowded server. Raise `maxWearers` only if you have measured that your players can
afford it.

## Presets

```lua
Config.Export = { enabled = true, file = 'data/presets.lua', maxPresets = 64 }
```

An admin saves the current look from the menu under a name. It is written to
`data/presets.lua` and applies for everyone without a restart. `maxPresets` caps the
number. The file ships empty. If you change `file`, the new file has to stay out of escrow
too, because the resource writes to it at runtime.

## Language

```lua
Config.Locale = 'en'
```

Seven languages ship: `en`, `de`, `fr`, `pt`, `es`, `th`, `it`. The texts live in
`locales/`. A key missing from the chosen language falls back to English. Keep the `%s`
and `%d` placeholders and their order. Thai uses Leelawadee UI or Tahoma, which every
Windows install has, because the menu font does not cover it.
