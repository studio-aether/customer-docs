---
title: Commands and menu
description: Console commands and the menu of aether_fae.
---

Type these in the F8 console, without a leading slash, or in chat with a slash. Who may use
what is set in [Configuration](/customer-docs/resources/aether-fae/configuration/).

## Commands

| Command | Needs | Does |
|---|---|---|
| `faewings` | `use` | Put the wings on, or take them off |
| `faewings off` | | Take them off |
| `faewings colour <index>` | `tint` | Set the colour, `-1` stops applying one. Without an index it shows the current one |
| `faewings save` | `save` | Save your look |
| `faewings autosave` | `save` | Switch applying your saved look on join on or off |
| `faewings forget` | `save` | Delete your saved look |
| `faewings preset <name>` | `use` | Load a stored preset and put it on |
| `faewings preset` | `use` | List the stored presets |
| `faewings reset` | `use` | Go back to the config values |
| `faewingsmenu` | `use` | Open the menu |

`colour` also answers to `color`, `tint` and `farbe`. Both command names can be changed in
`Config.Command` and `Config.MenuCommand`.

## Menu

`faewingsmenu` opens the menu with an orbit camera around your character. From there:

- put the wings on or take them off
- switch the wing beat on or off (Motion)
- pick a layer (membrane, veins or shimmer) and a colour for it
- load a preset
- adjust the placement (Adjust)
- save your outfit, delete it, or switch applying it on join
- admins: save the current look as a preset (Export), and manage the access list

The colour of a layer is shown on your character while you browse.

| Key | In the menu |
|---|---|
| Arrows | Move and change values |
| Enter | Select |
| Esc | Close |
| A / D | Turn the camera |
| W / S | Tilt the camera |
| Q / E | Camera up and down |
| Mouse wheel | Zoom |
| Drag | Turn the camera |
| Shift | Finer steps |
| 0 | Reset the camera |

## Adjust and presets

The defaults are measured against the RDR2 ped skeleton: the wings sit on `SKEL_Spine3`,
fitted to the male MP body. Bodies and clothing differ in how far the back stands out,
which is what **Adjust** is for. Steps are 2.5 mm, or 0.6 mm with Shift held. Veins and
shimmer ride on the membrane, so moving the wings moves all three.

**Export** needs the `admin` node. It writes the current placement and colour to
`data/presets.lua` under a name and applies for every player without a restart. Names take
`a-z`, `0-9` and underscore, up to 32 characters, and `Config.Export.maxPresets` caps how
many can exist.

## Motion key

Numpad 6 switches the wing beat on and off without the menu. Change the key or turn it off
in `Config.MotionKey`. Like the menu row, the key only changes the running look. **Save**
keeps it.
