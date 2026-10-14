---
title: Installation
description: Requirements, setup steps and the upgrade from aether_wings_fae.
---

## Requirements

- A RedM server (`rdr3`).
- `oxmysql`, only if you leave `Config.Save.enabled` on. Without it the resource still
  runs, players just cannot store a look.
- No framework is required. VORP and RSG are detected and used when present.

## Setup

1. Copy `aether_fae` into your `resources` folder.
2. Add `ensure aether_fae` to `server.cfg`. If you use saved looks, put it after `oxmysql`.
3. If another resource streams a model, texture or animation with the same name
   (`aether_fae2_m`, `aether_fae2_a`, `aether_fae2_s`, `aether_fae2_wing_v01`), stop it.
   These names are global.
4. Restart the server.
5. **Every player has to reconnect once.** Streamed assets only load on join, so a
   `restart` alone leaves clients on the old files.

No SQL to run: the two tables are created on first start when `Config.Save.autoCreate` is on.

## Checking it works

```
faewings
```

The wings appear. `faewingsmenu` opens the menu.

## Upgrading from aether_wings_fae

`aether_fae` is the same resource under a new name. ACE nodes, exports, events and the
database tables follow the resource name, so a few things change.

1. Remove the old `aether_wings_fae` folder from your `resources` folder. Do not run both
   side by side.
2. Copy `aether_fae` into your `resources` folder.
3. Replace `ensure aether_wings_fae` with `ensure aether_fae` in `server.cfg`.
4. Rename the ACE nodes. They are now `aether_fae.use`, `aether_fae.tint`,
   `aether_fae.save`, `aether_fae.gizmo` and `aether_fae.admin`. Any line in `server.cfg`
   that grants an `aether_wings_fae.*` node has to be changed.
5. Replace `exports.aether_wings_fae` with `exports.aether_fae` in your own scripts.
6. Saved looks from `aether_wings_fae` 1.0.0 do not carry over. The wings, their parts
   and the colour zones are new, so a 1.0.0 look has nothing to map onto and would fall
   back to the config defaults. Players pick their colours again. To keep the access list
   an admin built in the menu, point the resource at the old tables in the new
   `config.lua`:

```lua
Config.Save.table = 'aether_wings_fae_loadout'
```

   The access list table takes the same name with `_access` added. Without this line,
   `aether_fae` creates its own `aether_fae_loadout` tables and leaves the old ones
   untouched.

7. Restart the server. Every player has to reconnect once.

## What escrow leaves readable

Readable on purpose:

- `config.lua`, every setting.
- `data/presets.lua`, your own exported presets.
- `locales/*.lua`, all seven language files. Reword any line, or add a language.

Readable because Cfx Asset Escrow does not encrypt the format:

- `ui/`, the HTML, JavaScript, CSS, the font and the button image. Your players' browsers
  load these anyway, so encrypting them would protect nothing while stopping you from
  restyling the menu.
- `stream/*.ytyp`, the archetype definitions.
- `README.md`, `LICENSE` and `docs/DEVELOPERS.md`.

Everything else Cfx Asset Escrow can encrypt is encrypted, including every Lua file under
`client/` and `server/` and the YFT models. If you change `Config.Export.file`, its data
file has to stay out of escrow too, because the resource writes to it at runtime.
