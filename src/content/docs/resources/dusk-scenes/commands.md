---
title: Commands & controls
description: Commands, placement controls and the series mode in dusk_scenes.
---

## Commands

Names are configurable in `config.lua` (`Config.Commands`); an empty string disables
that command.

| Command | Effect |
|---|---|
| `/scenes` | Open the catalog — pick a note, prop, corpse or effect. |
| `/scenenote` | Place a text note directly, skipping the catalog. |
| `/sceneoptions` | Personal display settings. |
| `/scenespool` | Diagnostic: object pool + streaming (client). |
| `/scenesinfo` | Diagnostic: inventory + limits (server, admin). |
| `/scenesclear` | Cleanup (server, admin). |

## Showing the icons

Hold **L-ALT** to reveal the note icons and the interaction prompt. Without ALT the
screen stays clean. Gamepad players get the hint automatically when something is in
range.

## Placing

After choosing from the catalog, the **real model appears semi-transparent** at the
target and follows your aim. The prompts are native and only shown when they actually
do something.

| Control | Effect |
|---|---|
| Mouse | Aim — the marker sits exactly on the look point |
| Mouse wheel | Distance |
| **G** | Place — **the ghost stays active** |
| Q / E | Rotate (tap = 5°, hold = steady) |
| F | Take back the last placement |
| ESC | Done, back to the catalog |

### Series mode

After pressing **ENTER**, the object stays attached to the cursor, so a whole camp goes
up in one pass instead of clicking through the catalog per tent. The top-left shows
what's being placed and how many there are already. `G` takes the last one back, `ESC`
ends the series.

Text notes behave differently: ENTER opens the text editor there, ending placement mode.
