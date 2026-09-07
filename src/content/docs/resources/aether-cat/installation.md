---
title: Installation
description: Requirements and setup steps for aether_cat.
---

## Requirements

- A RedM server (`rdr3`).
- `oxmysql` — only if you leave `Config.Save.enabled` on. Without it the resource
  still runs, players just cannot store a look.
- No framework is required. VORP and RSG are detected and used when present.

## Setup

1. Copy `aether_cat` into your `resources` folder.
2. Add `ensure aether_cat` to `server.cfg`.
3. Restart the server.
4. **Every player has to reconnect once.** The client keeps streamed models in
   memory, so a `restart` alone leaves them on the old files.

No SQL to run: the two tables are created on first start when
`Config.Save.autoCreate` is on.

## Checking it works

```
neko
```

The props appear. `nekomenu` opens the menu.

## What escrow leaves readable

`config.lua`, `data/presets.lua`, the three files under `ui/`, `README.md` and
`docs/DEVELOPERS.md`. The UI is deliberately open: your players' browsers load it
anyway, so encrypting it would protect nothing while stopping you from restyling
the menu. Everything under `client/` and `server/` is encrypted.
