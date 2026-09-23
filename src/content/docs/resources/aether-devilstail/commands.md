---
title: Commands and menu
description: Console commands and the in-game menu of aether_devilstail.
---

Type these in the F8 console, without a leading slash.

| Command | Needs | Does |
|---|---|---|
| `devilstail` | `use` | Put it on, or confirm it is on |
| `devilstail off` | — | Take it off |
| `devilstail colour <index>` | `tint` | Set the colour, `-1` stops applying one |
| `devilstail save` | `save` | Store the current look |
| `devilstail autosave` | `save` | Toggle applying the stored look on join |
| `devilstail forget` | `save` | Delete the stored look |
| `devilstail preset <name>` | `use` | Apply a stored preset |
| `devilstail reset` | `use` | Back to the config defaults |
| `devilstailmenu` | `use` | Open the menu |

`colour` also answers to `color`, `tint` and `farbe`.

## Menu

Arrow keys move, Enter selects, Escape closes. Drag with the mouse to turn the
camera, the wheel zooms. Colours are shown as actual swatches, four rows of
eight, and hovering one previews it on the prop before you commit. That preview
is local: other players keep seeing your committed colour until you pick one.
Closing the menu or cancelling an adjustment puts the committed look back.

**Adjust** moves a part live: 2.5 mm steps, 0.6 mm with Shift held. The finished
numbers are written to the F8 console so you can paste them into `config.lua`.

## Presets

Open the menu and pick **Export**. It needs the `admin` node, and it stores
the current placement and colour under a name you type. There is no console
command for this.

The preset applies immediately for every player, no restart. Names take `a-z`, `0-9` and
underscore, up to 32 characters, and `Config.Export.maxPresets` caps how many can
exist. Presets live in `data/presets.lua`.
