---
title: Configuration
description: Every option in config.lua for aether_fogofwar, what it does and its default value.
---

`config.lua` and the files under `config/locales/` are the only files you can edit.
Everything else is escrow protected.

## Persistence

| Setting | Default | Purpose |
|---|---|---|
| `Enabled` | `true` | Master switch for the whole resource. |
| `PersistenceMode` | `'character'` | `'character'` gives every character its own map; `'account'` shares one map across all characters of a player. |

## Language

| Setting | Default | Purpose |
|---|---|---|
| `Locale` | `'en'` | Language for every player-facing text: `en`, `de`, `fr`, `es`, `pt`. An unknown value falls back to `en` with a console warning. |

## Grid

| Setting | Default | Purpose |
|---|---|---|
| `MapBounds` | `{ minX = -8000.0, maxX = 4500.0, minY = -4500.0, maxY = 7000.0 }` | The area covered by the grid. |
| `CellSize` | `100.0` | Size of one grid cell, in metres. |

`MapBounds` and `CellSize` together form a signature stored with every saved map. Changing
either one invalidates stored progress; see Installation.

## Sampling and sync

| Setting | Default | Purpose |
|---|---|---|
| `SampleInterval` | `750` | How often the client checks its position, in ms. |
| `SampleRingRadius` | `2` | Cells revealed around the player; `2` means a 5 by 5 block. |
| `FlushInterval` | `20000` | How often the client sends newly revealed cells to the server, in ms. |
| `MaxCellsPerFlush` | `512` | Upper bound on cells accepted in one flush. |
| `MinFlushGap` | `5000` | Minimum time between two accepted flushes from the same player, in ms. |
| `MinDiscoveryGap` | `3000` | Minimum time between two accepted discovery reports from the same player, in ms. |
| `SaveInterval` | `60000` | How often the server writes dirty maps to the database, in ms. |

## Replay

| Setting | Default | Purpose |
|---|---|---|
| `MaxRevealVolumes` | `4096` | Upper bound on rectangles replayed on spawn. |
| `ReplayPerFrame` | `64` | Rectangles pushed per frame during replay. Lower it if the spawn replay stutters. |
| `RevealPulseFrames` | `3` | Frames each reveal is held while the engine writes it into its fog buffer. Raise it if reveals do not stick. |
| `ResetSettleFrames` | `10` | Frames waited after arming a fog rebuild before the rectangles are pushed. |

## Full reveal

| Setting | Default | Purpose |
|---|---|---|
| `FullRevealPercent` | `0.0` | Above this percentage of the grid explored, a character is marked fully explored and stops being tracked. `0` disables it. |

## Guarma

| Setting | Default | Purpose |
|---|---|---|
| `HandleGuarma` | `true` | Switch the minimap zone and suspend tracking while the character is on Guarma. |

## Framework load events

| Setting | Default | Purpose |
|---|---|---|
| `ReadyEvents` | `{ 'vorp:SelectedCharacter', 'RSGCore:Client:OnPlayerLoaded', 'QBCore:Client:OnPlayerLoaded', 'ox:playerLoaded' }` | Events that mean a character is now loaded. |

## Discoveries

| Setting | Default | Purpose |
|---|---|---|
| `Discoveries.enabled` | `true` | Master switch for discovery rewards. |
| `Discoveries.zoneTypes` | `{ 1, 10 }` | Map zone types that count as a discovery: `1` towns, `10` districts, `0` states. |
| `Discoveries.notify` | `true` | Show a notification when a zone is discovered. |
| `Discoveries.maxDistance` | `600.0` | How far a reported discovery may sit from the server-side player position before it is rejected. |
| `Discoveries.rewards` | see below | Money per zone key. |

The default `rewards` table ships two example entries:

```lua
Config.Discoveries.rewards = {
    ['town:valentine'] = { money = 2.0, moneyType = 0 },
    ['district:grizzlies'] = { money = 10.0, moneyType = 0 },
}
```

Keys are written exactly like the locale files use them, `type:zone`.

## Pre-revealed zones

| Setting | Default | Purpose |
|---|---|---|
| `PreRevealedZones` | one entry, Valentine | Areas every character starts with already revealed, typically the town they spawn in. |

```lua
Config.PreRevealedZones = {
    { name = 'valentine', coords = vector3(-275.0, 802.0, 119.0), radius = 400.0 },
}
```

## Regions

| Setting | Default | Purpose |
|---|---|---|
| `Regions` | `{}` | Named areas your own scripts can reveal through the `RevealRegion` export. Ships empty for you to fill. |

## Admin

| Setting | Default | Purpose |
|---|---|---|
| `AdminAce` | `'aether_fogofwar.admin'` | ACE permission for the admin command. |
| `AdminCommand` | `'fog'` | Console command name, see [Commands](/customer-docs/resources/aether-fog-of-war/commands/). |

## Debug

| Setting | Default | Purpose |
|---|---|---|
| `Debug` | `false` | Print grid signature, save and discovery details to the server console. |

## Languages

Five languages ship, and `Config.Locale` picks one:

```
config/locales/en.lua   config/locales/fr.lua   config/locales/pt.lua
config/locales/de.lua   config/locales/es.lua
```

Each file holds the same keys: one label per map zone, plus a `fallback` pattern and the
admin console strings. All five are escrow-open, so any of them can be reworded freely. A key
left out falls back to the English text rather than showing a blank notification, so a
partial edit is safe.

To add another language, copy a file, rename its table (for example `Locales.it = {`), list
it in `fxmanifest.lua` under `shared_scripts` and in `escrow_ignore`, then set
`Config.Locale`.
