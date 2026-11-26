---
title: Configuration
description: All settings in config.lua of aether_magicweapons.
---

Everything you can change lives in `config.lua`, which stays readable after escrow. Texts are
in `locales/`.

## General

| Setting | Meaning |
|---|---|
| `Config.Language` | `en`, `de`, `fr`, `pt`, `es` or `th`; English fills missing keys |
| `Config.CreateItems` | Create missing items in the database on start |
| `Config.FxRange` | Players within this range in metres see hit effects and auras |
| `Config.Range` | Maximum hit distance for `melee` and `bow` |
| `Config.RateLimit` | Maximum procs and client hit reports per player in a time window |
| `Config.EquipCooldownMs` | Minimum time between two item uses |
| `Config.AttackWindowMs` | How long after the wielder's own attack a health loss counts as a hit |
| `Config.AntiCheat.clientEvent` | Optional local client event fired with `(weaponHash, given)`, to whitelist the summoned weapon in a weapon anticheat |
| `Config.TestCommand` | Optional restricted test command, see Installation |

## Limits

`Config.Limits` caps every effect, whatever a weapon entry says.

| Key | Default | Meaning |
|---|---|---|
| `slowMs` | `5000` | Longest slow |
| `burnMs` | `5000` | Longest burn |
| `healPerProc` | `60` | Most health healed per hit |
| `dotMs` | `8000` | Longest poison |
| `dotPerTick` | `15` | Most poison damage per tick |
| `dotTickMinMs` | `500` | Shortest poison tick |
| `healsPerTarget` | `3` | Lifesteal heals per target within `healTargetWindowMs` |
| `healTargetWindowMs` | `30000` | Window for `healsPerTarget` |

## Effects

`Config.Effects` holds the particle effects per effect type (`frost`, `fire`, `lifesteal`,
`poison`):

| Key | Where it plays |
|---|---|
| `hit` | On the target on a hit |
| `attacker` | On the wielder on a hit (lifesteal) |
| `summon` | Once on the wielder when the weapon is summoned |
| `beam` | A stream from the target to the wielder |
| `aura` | Looped on the drawn weapon, with `offset` and `rotation` along the blade |

Each effect can be played once or looped for `durationMs` and tinted with `colour` (and `alpha`
for an aura). A weapon entry can set its own `aura`.

## Adding a weapon

Add an entry to `Config.Weapons`. The key is the item name:

```lua
mw_frost_machete = {
    label = 'Frost Machete',
    description = 'Hits slow the target.',
    weapon = 'WEAPON_MELEE_MACHETE',
    kind = 'melee',          -- 'melee' or 'bow'
    effect = 'frost',        -- 'frost', 'fire', 'lifesteal' or 'poison'
    procCooldownMs = 1500,
    slowMs = 3000,           -- frost
    moveRate = 0.6,          -- frost
    maxMoveBlend = 1.0,      -- frost
    -- healPercent = 0.25,   -- lifesteal
    -- maxHeal = 40,         -- lifesteal
    -- dotMs = 5000, dotTickMs = 1000, dotDamage = 8,  -- poison
    -- burnMs = 3000,        -- fire
},
```

Restart the server once so the new item is created and loaded by `vorp_inventory`.
