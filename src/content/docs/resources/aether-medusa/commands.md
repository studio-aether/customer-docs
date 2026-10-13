---
title: Commands and menu
description: Console commands and the menu of aether_medusa.
---

Type these in the F8 console, without a leading slash. Who may use what is set in
[Configuration](/customer-docs/resources/aether-medusa/configuration/).

## Commands

| Command | Does |
|---|---|
| `medusamenu` | Open the menu |
| `medusa` | Put the hairstyle on, or take it off |
| `medusa off` | Take it off |
| `medusa colour <index>` | Set the colour, `0` to `31`. Without an index it shows the current one |
| `medusa save` | Save your look |
| `medusa autosave` | Switch applying your saved look on join on or off |
| `medusa forget` | Delete your saved look |
| `medusa preset <name>` | Apply a preset. Without a name it lists them |
| `medusa reset` | Go back to the config values |

Both command names can be changed in `Config.Command` and `Config.MenuCommand`.

## Menu

`medusamenu` opens the menu with an orbit camera around your character. From there:

- put the hairstyle on or take it off
- pick a zone (scales, belly or heads) and a colour for it
- switch the snake motion on or off
- adjust the placement in small steps, if you have the permission
- save your look, delete it, or switch applying it on join
- admins: save the current look as a preset, and manage the access list

The colour of a zone is shown on your character while you browse.
