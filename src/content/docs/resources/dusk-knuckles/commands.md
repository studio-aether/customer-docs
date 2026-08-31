---
title: Fitting & commands
description: In-game tools to fit the prop and diagnose attachment issues.
---

With `Config.Adjust = true` the resource registers console commands. Open the F8 console
(no leading slash) to use them.

| Command | Purpose |
|---|---|
| `knuckles_adjust` | Open/close the offset panel. The mouse cursor is freed, ESC closes it. |
| `knuckles_bone [name]` | Switch the attachment bone live. Without an argument it lists candidates. |
| `knuckles_clean` | Delete orphaned props left over from a crashed session. |
| `knuckles_debug` | Three-second attachment diagnostic printed to the console. |

## Fitting workflow

1. Equip the knuckles so the prop is visible.
2. Run `knuckles_adjust` and dial in the offset and rotation.
3. Click **Apply to config** — it prints ready-to-paste `Config.Bone`, `Config.Offset`
   and `Config.Rotation` lines to the console.
4. Paste those into `config.lua`, then set `Config.Adjust = false` for production.

## Switching bones

`knuckles_bone <name>` changes the bone live. Note:

- `PH_*` bones are prop holders driven by the engine itself.
- `SKEL_*` bones are plain skeleton bones moved only by the animation.
- **Offsets do not carry over to a different bone** — they must be dialled in again.

Run `knuckles_bone` without an argument to list available candidates and their indices.
If the configured bone does not exist on a ped, the resource falls back to the root bone
and prints a warning.
