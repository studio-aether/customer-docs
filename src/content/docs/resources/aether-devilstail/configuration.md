---
title: Configuration
description: Every option in config.lua for aether_devilstail.
---

Everything lives in `config.lua`, which stays readable after escrow.

## Permissions

```lua
Config.Permissions = {
    use   = { ace = 'aether_devilstail.use',   groups = { 'user', 'admin' }, everyone = true },
    tint  = { ace = 'aether_devilstail.tint',  groups = { 'user', 'admin' }, everyone = true },
    save  = { ace = 'aether_devilstail.save',  groups = { 'user', 'admin' }, everyone = true },
    gizmo = { ace = 'aether_devilstail.gizmo', groups = { 'admin' },         everyone = true },
    admin = { ace = 'aether_devilstail.admin', groups = { 'admin' },         everyone = false },
}
```

| Node | Allows |
|---|---|
| `use` | wear it at all |
| `tint` | change the colour |
| `save` | store a look in the database |
| `gizmo` | move parts in game |
| `admin` | preset export, access list, admin menu |

`everyone = true` switches that node on for all players and skips the group and
ACE check entirely. Set it to `false` to fall back to `groups` and `ace`:

```
add_ace group.admin aether_devilstail.admin allow
```

## Admins without a framework group

```lua
Config.Admins = {
    discord = { '281509113563971584' },
    identifiers = { 'license:abc123...' },
}
```

Discord IDs are digits only, without the `discord:` prefix. The server reads them
from the player's identifiers; a client never sees this list.

## Saving

```lua
Config.Save = {
    enabled      = true,
    autoCreate   = true,
    table        = nil,
    saveOnAttach = false,
    applyOnJoin  = true,
    playerChoice = true,
}
```

| Option | Meaning |
|---|---|
| `enabled` | players may store a look at all |
| `autoCreate` | create the tables on start if they are missing |
| `table` | `nil` uses the resource name plus `_loadout` |
| `saveOnAttach` | store on every put-on instead of on request |
| `applyOnJoin` | restore the stored look when the player joins |
| `playerChoice` | let each player switch `applyOnJoin` off for themselves |

## Language

```lua
Config.Locale = 'en'
```

Six languages ship: `en`, `de`, `fr`, `pt`, `es`, `th`. A key missing from the
chosen language falls back to English, so a partly translated file never puts a
raw key in front of a player.

To add your own, drop `locales/<code>.lua` next to the others and point
`Config.Locale` at it. The folder stays readable after escrow, so rewording the
shipped text works the same way. Keep the `%s` and `%d` placeholders and their
order: a line that loses one falls back to the unformatted sentence rather than
breaking the resource.

Thai needs a font that covers it. The menu font does not, so the stylesheet
falls back to Leelawadee UI and Tahoma, both present on every Windows install.

## Colours

```lua
Config.Tint = {
    enabled = true,
    perRow  = 8,
    default = 0,
    allowed = 'all',
    rows    = { ... },
}
```

`allowed` is either `'all'` or a list of indices, for example `{ 0, 1, 2, 16 }`.
The menu only offers what is listed, and the server checks every colour a client
sends against the same list.

`rows` holds the 32 palette entries with their labels. **The labels have to match
the palette baked into the model.** Changing a hex value here only renames the
swatch in the menu; the prop keeps the colour that is in its texture.

## Placement

`Config.Sets` holds each part with its bone, offset and rotation. The shipped
values are measured against the RDR2 ped skeleton: the tail on `SKEL_ROOT`, the
horns on `SKEL_Head` with their base 15.5 cm above the bone. Ped models differ in
head shape, which is what the in-game **Adjust** mode is for.

Any part also takes `enabled = false`, which removes it for everyone: no model,
no colour row, no sync. `default = false` keeps it off until a script switches it
on through the `SetPart` export.

## Motion

### The tail

The tail is not moved by the script. It is a fragment carrying a four joint
chain, and the resource plays a custom idle animation on it with a single call.
The engine does the rest. Nothing is re-attached per frame and the cost does not
grow with the number of wearers nearby. A watchdog restarts the clip if it ever
stops.

```lua
animDict  = 'aether_devil_sway_v1',
animName  = 'idle',
animSpeed = 1.0,
```

`animSpeed` changes only the pace. How far the tail swings comes from the
authored animation, not from a setting. The dictionary ships in `stream/`, so
there is no second resource to install.

### The horns

The horns carry `motion = 'none'` and do not move. Horns that sway look wrong,
and a still prop costs nothing.

### The script driven modes

```lua
Config.EarMotion  = { enabled = false }
Config.SwayMotion = { enabled = false }
Config.WingMotion = { enabled = false }
```

All three are off and no shipped part uses them. They exist because the three
cosmetics share one codebase; switch a part to `motion = 'sway'` and the matching
block takes over. Unlike the animated tail, those modes re-attach the prop on
every step, so they cost per frame.
