---
title: Configuration
description: Every option in config.lua for aether_wings_fae.
---

Everything lives in `config.lua`, which stays readable after escrow.

## Permissions

```lua
Config.Permissions = {
    use   = { ace = 'aether_wings_fae.use',   groups = { 'user', 'admin' }, everyone = true },
    tint  = { ace = 'aether_wings_fae.tint',  groups = { 'user', 'admin' }, everyone = true },
    save  = { ace = 'aether_wings_fae.save',  groups = { 'user', 'admin' }, everyone = true },
    gizmo = { ace = 'aether_wings_fae.gizmo', groups = { 'admin' },         everyone = true },
    admin = { ace = 'aether_wings_fae.admin', groups = { 'admin' },         everyone = false },
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
add_ace group.admin aether_wings_fae.admin allow
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
values are measured against the RDR2 ped skeleton: both wings on `SKEL_Spine3`. Ped models differ, which
is what the in-game **Adjust** mode is for.

## Motion

The wings beat quickly with a small amplitude, faster while running. `Config.WingMotion` sets the character.
