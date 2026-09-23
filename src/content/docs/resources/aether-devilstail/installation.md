---
title: Installation
description: Requirements and setup steps for aether_devilstail.
---

## Requirements

- A RedM server (`rdr3`).
- `oxmysql` — only if you leave `Config.Save.enabled` on. Without it the resource
  still runs, players just cannot store a look.
- No framework is required. VORP and RSG are detected and used when present.

## Setup

1. Copy `aether_devilstail` into your `resources` folder.
2. Add `ensure aether_devilstail` to `server.cfg`.
3. If you already run a separate animation resource that streams
   `aether_devil_sway_v1`, stop it. The animation ships inside this resource now,
   and two resources claiming the same global dictionary name fight over it.
4. Restart the server.
5. **Every player has to reconnect once.** The client keeps streamed models in
   memory, so a `restart` alone leaves them on the old files.

No SQL to run: the two tables are created on first start when
`Config.Save.autoCreate` is on.

## Checking it works

```
devilstail
```

The props appear. `devilstailmenu` opens the menu.

## What escrow leaves readable

Readable on purpose:

- `config.lua` — every setting.
- `data/presets.lua` — your own exported presets.
- `locales/*.lua` — all six language files. Reword any line, or add a language.

Readable because Cfx Asset Escrow does not encrypt the format:

- `ui/` — HTML, JavaScript, CSS, the font and the button image. Your players'
  browsers load these anyway, so encrypting them would protect nothing while
  stopping you from restyling the menu.
- `stream/*.ytyp` and `stream/*.ycd` — the archetype definitions and the tail
  animation.
- `README.md`, `LICENSE` and `docs/DEVELOPERS.md`.

Everything else is encrypted, including every file under `client/` and `server/`
and both model files.
