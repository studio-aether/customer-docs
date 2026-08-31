---
title: Configuration
description: Reference for every dusk_scenes setting in config.lua.
---

Everything lives in `config.lua`, which stays readable after escrow. The player-facing
texts are in `config/locale.lua`; the object catalog is in `config/catalog.lua`.

## Limits

Three independent, server-authoritative brakes. A tampered client bypasses none of them.

| Setting | Default | Purpose |
|---|---|---|
| `Config.MaxScenesPerChar` | `100` | Max scenes one character may have placed at once. `0` = no limit. |
| `Config.MaxPerCharByKind` | see below | Per-kind cap, applied together with `MaxScenesPerChar`. |
| `Config.MaxScenesTotal` | `1500` | Server-wide cap across all players. `0` = no limit. |
| `Config.WhenFull` | `'reject'` | What happens at `MaxScenesTotal`: `'reject'` or `'oldest'` (FIFO). |
| `Config.MaxDurationSeconds` | `259200` | Hard cap on every expiring scene (72 h). |
| `Config.AllowPermanentText` | `true` | Let text notes stand forever (`duration = 0`). |
| `Config.DefaultDurationSeconds` | `86400` | Default lifetime when creating (24 h). |
| `Config.CreateCooldownMs` | `400` | Min time between placements (anti-spam). |

Default per-kind caps:

```lua
Config.MaxPerCharByKind = {
    text   = 40,  -- cheap: a DB row
    prop   = 50,  -- entity budget
    ped    = 8,   -- own, small ped pool
    effect = 4,   -- most expensive: runs continuously
    decal  = 20,
}
```

## Permissions

| Setting | Default | Purpose |
|---|---|---|
| `Config.DeletePolicy` | `'anyone'` | Who may delete: `'anyone'`, `'owner'`, `'owner_or_admin'`. |
| `Config.AdminCanEditAll` | `false` | Let admins edit every note. |
| `Config.AdminGroups` | `{ 'admin', 'superadmin' }` | Framework groups treated as admin. |
| `Config.LogDeletes` | `true` | Moderation log in the server console. |

> On public servers `'anyone'` is a griefing vector — one player can clear a town's
> decoration in a minute. For production, prefer `'owner_or_admin'`.

## World icon & reading

| Setting | Purpose |
|---|---|
| `Config.Icon` | World marker: `mode` (`'sprite'`/`'text'`), `dict`, `texture`, size/color/scale. |
| `Config.IconDrawDistance` | Draw the icon only within this distance. |
| `Config.ReadDistance` | Distance where the note is readable and the prompt is active. |
| `Config.ObjectReachBonus` | Extra reach for placed objects (a casing on the floor is hard to aim at). |
| `Config.GridRadius` | `lib.grid` entry radius (must be `>= IconDrawDistance`). |
| `Config.ReadText` | Floating read text: font size at reference distance, scaling. |
| `Config.Snippet` | Preview of the aimed scene in the prompt (`words`, `maxChars`). |

## Fonts & backgrounds

| Setting | Purpose |
|---|---|
| `Config.FontOrder` | Font order in the editor. |
| `Config.Fonts` | Font definitions: `label`, `stack` (CSS font stack), `scale`, `weight`. |
| `Config.DefaultFont` | Font applied to new notes. |
| `Config.Backgrounds` | Note backgrounds (`none`, `dark`, `light`, `wood`) with color + text color. |
| `Config.BackgroundOrder` | Order in the NUI picker. |

Fonts are **bundled** (`nui/assets/fonts/`) and referenced via `@font-face`, so a note
looks identical on every client — no silent fallback to Arial.

## Keys

Key bindings use verified RDR3 control hashes, chosen so they don't collide with normal
play. The full map lives in `Config.Keys`; the important ones:

| Key | Hash | Action |
|---|---|---|
| `interact` | `0xCEFD9220` | E — read/edit a scene |
| `revealHold` | `0x8AAA0AD4` | L-ALT — show icons + prompts |
| `place` | `0x760A9C6F` | G — place |
| `cancel` | `0x156F7119` | ESC — finish |
| `undo` | `0xD596CFB0` | F — take back the last placement |
| `rotateLeft` / `rotateRight` | Q / E | rotate while placing |

## Commands

Names are configurable (empty string disables a command). See
[Commands & controls](/resources/dusk-scenes/commands/).

```lua
Config.Commands = {
    open    = 'scenes',
    note    = 'scenenote',
    options = 'sceneoptions',
    pool    = 'scenespool',
    info    = 'scenesinfo',
    clear   = 'scenesclear',
}
```

## Framework & notify

| Setting | Default | Purpose |
|---|---|---|
| `Config.Framework` | `'auto'` | `'auto'`, `'vorp'`, `'rsg'`, `'qbr'`, `'ox'`, `'standalone'`. |
| `Config.Notify` | `nil` | Custom notify callback; `nil` = framework/lib notify. |

## Streaming (performance)

See [Troubleshooting & performance](/resources/dusk-scenes/troubleshooting/) for the
full explanation. The tunables live in `Config.Stream`:

| Setting | Default | Purpose |
|---|---|---|
| `spawnDist` / `despawnDist` | `90.0` / `105.0` | Radii; the gap is deliberate hysteresis. |
| `maxEntities` | `60` | Hard cap on concurrently spawned props/peds. |
| `maxEffects` | `12` | Separate cap for particle effects. |
| `poolSoftLimit` / `poolHardLimit` | `2400` / `2800` | Emergency brakes on the object pool. |
| `minFreePedSlots` | `30` | Don't spawn corpses when the ped pool is almost full. |
| `spawnsPerTick` | `2` | Spawns per tick, spreads a full camp over frames. |
| `tickInterval` | `250` | Tick interval in ms. |

## Ghost (placement preview)

| Setting | Default | Purpose |
|---|---|---|
| `alpha` | `150` | Ghost transparency (RDR3 quantises alpha in steps of 51). |
| `rotateStep` | `5.0` | Degrees per tap. |
| `rotateSpeed` | `90.0` | Degrees per second while held. |

## Discord webhook

```lua
Config.Webhook = {
    enabled   = false,
    url       = '',
    name      = 'dusk_scenes',
    color     = 0x8B5A2B,
    flushMs   = 5000,
    maxBatch  = 10,
    events    = { create = true, edit = true, delete = true },
    logCoords = true,
}
```

Events are collected over `flushMs` and sent as one embed — no request per placement.
On rate-limit the script honours `Retry-After`. If the webhook fails, log lines are
lost, never gameplay.
