---
title: Configuration
description: Every option in config.lua for aether_medusa.
---

Everything lives in `config.lua`, which stays readable after escrow, together with
`data/presets.lua` and the language files.

## Framework and commands

```lua
Config.Framework = 'auto'
Config.Locale = 'en'
Config.Command = 'medusa'
Config.MenuCommand = 'medusamenu'
```

| Option | Meaning |
|---|---|
| `Framework` | `auto` detects VORP or RSG, otherwise the resource runs on ACE |
| `Locale` | language, see below |
| `Command` | the main command |
| `MenuCommand` | the command that opens the menu |

## Permissions

```lua
Config.Permissions = {
    use   = { ace = 'aether_medusa.use',   groups = { 'user', 'admin' }, everyone = true },
    tint  = { ace = 'aether_medusa.tint',  groups = { 'user', 'admin' }, everyone = true },
    save  = { ace = 'aether_medusa.save',  groups = { 'user', 'admin' }, everyone = true },
    gizmo = { ace = 'aether_medusa.gizmo', groups = { 'admin' },         everyone = true },
    admin = { ace = 'aether_medusa.admin', groups = { 'admin' },         everyone = false },
}
```

| Node | Allows |
|---|---|
| `use` | putting the hairstyle on and taking it off |
| `tint` | changing colours |
| `save` | saving a look |
| `gizmo` | adjusting the placement |
| `admin` | presets and the access list |

A node is granted when `everyone` is `true`, when the player holds the ACE node, or when
the framework group is in `groups`. Out of the box everything except `admin` is open to
every player. Set `everyone = false` to restrict a node, then grant it in `server.cfg`:

```
add_ace group.admin aether_medusa.admin allow
```

Players without a framework group can be made admins by Discord or game identifier:

```lua
Config.Admins = {
    discord = { },
    identifiers = { },
}
```

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

The table name follows the resource name. Renaming the folder points the resource at a
new, empty table and leaves the old one untouched. To keep existing looks, set the old
name in `table`, for example `'old_resource_name_loadout'`.

## Colours

```lua
Config.Tint = { enabled = true, perRow = 8, default = 13, allowed = 'all', rows = { ... } }

Config.TintGroups = {
    { id = 'hair',  label = 'Scales', parts = { 'snake_01' }, default = 13 },
    { id = 'belly', label = 'Belly',  parts = { 'belly' },    default = 8 },
    { id = 'heads', label = 'Heads',  parts = { 'heads' },    default = 13 },
}
```

| Option | Meaning |
|---|---|
| `Tint.enabled` | switches colouring on or off |
| `Tint.perRow` | colours per row in the menu |
| `Tint.default` | starting colour |
| `Tint.allowed` | `'all'`, or a list of indices the server accepts |
| `Tint.rows` | the 32 colours, index `0` to `31`, with the name and the swatch shown in the menu |
| `TintGroups` | the three zones and the starting colour of each |

The server rejects any colour outside `Tint.allowed`, whatever a client sends. The
colours themselves are fixed, `rows` only names them and sets the swatch shown in the menu.

## Sets and fit

```lua
Config.DefaultSet = 'medusa'
```

`medusa` is the female fit and `medusa_male` the male fit. `DefaultSet` is the one put on
when nothing else is asked for.

## Motion

```lua
Config.MotionSwitch = true
Config.MotionKey = { enabled = false, key = 0x66 }
```

| Option | Meaning |
|---|---|
| `MotionSwitch` | shows the Motion row in the menu and keeps the choice with the saved look |
| `MotionKey.enabled` | turns the motion hotkey on |
| `MotionKey.key` | the control hash of the key |

With the motion off the snakes rest still. Everyone nearby sees the same.

## Visibility to other players

```lua
Config.Sync = { enabled = true, range = 45.0, scanInterval = 900, moveInterval = 60, maxWearers = 12 }
```

| Option | Meaning |
|---|---|
| `enabled` | shows the look to other players |
| `range` | distance in metres within which other wearers are shown |
| `maxWearers` | how many other wearers one client shows at once |

Lower `range` and `maxWearers` on a crowded server. `scanInterval` and `moveInterval`
are in milliseconds and rarely need a change.

## Presets

```lua
Config.Export = { enabled = true, file = 'data/presets.lua', maxPresets = 64 }
```

An admin saves the current look from the menu under a name. It is written to
`data/presets.lua` and applies for everyone without a restart. `maxPresets` caps the
number. Two presets, `medusa_female` and `medusa_male`, come with the resource.

## Language

```lua
Config.Locale = 'en'
```

Seven languages ship: `en`, `de`, `fr`, `pt`, `es`, `th`, `it`. The texts live in
`locales/`. A key missing from the chosen language falls back to English. Keep the `%s`
and `%d` placeholders and their order.
