---
title: Configuration
description: Every setting in dusk_knuckles lives in config.lua.
---

All configuration lives in `config.lua`, which stays readable after escrow.

| Setting | Purpose |
|---|---|
| `Config.Item` | Inventory item name. Must match the `item` column created by `install.sql`. |
| `Config.Model` | Prop model. The resource streams `dusk_knuckles` itself, no extra pack needed. |
| `Config.DamageMultiplier` | Damage while worn. Clamped server-side to **1.0 – 10.0**. |
| `Config.DamageGroups` | Weapon groups the multiplier applies to (see below). |
| `Config.Bone` | Player bone the prop is attached to. Default `SKEL_R_Finger21`. |
| `Config.Offset` | Position offset in meters, relative to the bone. `x` = forward/back, `y` = left/right, `z` = up/down. |
| `Config.Rotation` | Rotation in degrees, relative to the bone. `x` = pitch, `y` = roll, `z` = yaw. |
| `Config.Adjust` | In-game fitting tools (see [Commands](/resources/dusk-knuckles/commands/)). Leave `true` while dialling in values, set `false` for production. |
| `Config.RevalidateSeconds` | How often the server re-checks item ownership. Minimum 5. |
| `Config.UnequipOnDeath` | Take the knuckles off automatically on death. |
| `Config.Text` | Notification texts, sent through `jo.notif`. |

## Damage

`GROUP_UNARMED` is the group that matters. A knuckle duster is a prop worn on the hand —
the player still fights bare-handed — so unarmed damage is what changes. Add `GROUP_MELEE`
to `Config.DamageGroups` if knives and machetes should also hit harder while worn.

The multiplier is clamped on the server before it is sent to the client, so a tampered
client can never raise it. `1.0` means vanilla damage.
