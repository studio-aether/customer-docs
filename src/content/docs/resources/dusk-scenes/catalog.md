---
title: Catalog
description: Extending the dusk_scenes object catalog in config/catalog.lua.
---

Everything placeable lives in `config/catalog.lua`, which stays readable after escrow.
The menu builds itself from this file — nothing in the NUI needs to change.

## The key is the identity

One entry is enough:

```lua
lantern = {
    label    = 'Laterne',
    category = 'camp',
    kind     = 'prop',
    model    = 'p_lanternwall01x',
    ground   = true,
    duration = 28800,
},
```

- **`key`** (here `lantern`) is the identity and lands in the database. **It must never change.**
- **`label`** is display-only — rename or translate it any time.

> This is the key difference to the previous system, which resolved props by their
> display text. There, any rename, translation or typo orphaned existing entries.
> Here the two are cleanly separated.

## Field reference

| Field | Type | Purpose |
|---|---|---|
| `label` | string | Display name in the menu (free to change). |
| `category` | string | Key from `Catalog.Categories`. |
| `kind` | string | `'prop'`, `'ped'`, `'effect'` or `'decal'`. |
| `model` | string | Model name for `prop` / `ped`. |
| `asset` | string | PTFX asset for `effect` (e.g. `'core'`). |
| `effect` | string | PTFX name for `effect`. |
| `scale` | number | PTFX scaling (`effect` only). |
| `outfit` | number | Outfit preset index for `ped`. Derived from scene id when omitted. |
| `outfitPool` | number | Number of presets to derive from (default `8`). |
| `ground` | boolean | Snap to the ground after spawning. |
| `offset` | vec3 | Fixed offset from the stored point. |
| `pickup` | boolean | Pickup glint (`SetPickupLight`). |
| `duration` | number | Default lifetime in seconds (server caps at `MaxDurationSeconds`). |
| `noRotate` | boolean | Lock rotation in the ghost (e.g. casings, effects). |
| `custom` | boolean | Model not from the base game — needs its own streaming. |

## Categories

Categories are defined in `Catalog.Categories`; the order is the menu order. `icon` is a
filename under `nui/assets/` (the original RDR3 blip textures).

```lua
Catalog.Categories = {
    { id = 'note',  label = 'Notiz',      icon = 'blip_mp_ordered_item.png' },
    { id = 'crime', label = 'Tatort',     icon = 'blip_radius_search.png' },
    { id = 'grave', label = 'Grab & Tod', icon = 'blip_mp_elimination_small.png' },
    { id = 'deco',  label = 'Deko',       icon = 'blip_ambient_crate.png' },
    { id = 'fx',    label = 'Effekte',    icon = 'blip_mp_fire.png' },
}
```

## Security

The server accepts **only keys that exist in this catalog**. A manipulated client can
never push an arbitrary model — model name and lifetime always come from here, never
from the client.

## Adding a new category

1. Put a PNG into `nui/assets/`.
2. Add the entry to `Catalog.Categories`.
3. Add the file to the `files {}` block in `fxmanifest.lua` — otherwise the client
   gets a 404 and the icon stays blank.
