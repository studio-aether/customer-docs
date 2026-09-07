---
title: Commands and menu
description: Console commands and the in-game menu of aether_wings_demon.
---

Type these in the F8 console, without a leading slash.

| Command | Needs | Does |
|---|---|---|
| `demonwings` | `use` | Put it on, or confirm it is on |
| `demonwings off` | — | Take it off |
| `demonwings colour <index>` | `tint` | Set the colour, `-1` stops applying one |
| `demonwings save` | `save` | Store the current look |
| `demonwings autosave` | `save` | Toggle applying the stored look on join |
| `demonwings forget` | `save` | Delete the stored look |
| `demonwings preset <name>` | `use` | Apply a stored preset |
| `demonwings reset` | `use` | Back to the config defaults |
| `demonwingsmenu` | `use` | Open the menu |

`colour` also answers to `color`, `tint` and `farbe`.

## Menu

Arrow keys move, Enter selects, Escape closes. Drag with the mouse to turn the
camera, the wheel zooms. Colours are shown as actual swatches, four rows of
eight, and hovering one previews it on the prop before you commit.

**Adjust** moves a part live: 2.5 mm steps, 0.6 mm with Shift held. The finished
numbers are written to the F8 console so you can paste them into `config.lua`.

## Presets

An admin stores the current placement and colour under a name:

```
demonwingsexport my_variant
```

It applies immediately for every player, no restart. Names take `a-z`, `0-9` and
underscore, up to 32 characters, and `Config.Export.maxPresets` caps how many can
exist. Presets live in `data/presets.lua`.
