---
title: Installation
description: Requirements and setup for dusk_scenes.
---

## Requirements

- A RedM server (`rdr3`).
- [`ox_lib`](https://github.com/overextended/ox_lib)
- [`oxmysql`](https://github.com/overextended/oxmysql)

That is the entire dependency list — no framework is required.

## Setup

1. Copy `dusk_scenes` into your `resources` folder.
2. In `server.cfg`, ensure the dependencies first, then the resource:

   ```
   ensure ox_lib
   ensure oxmysql
   ensure dusk_scenes
   ```

3. Start the server. The database table creates itself on first start — nothing to import.

The detected framework is logged on startup:

```
[dusk_scenes] Framework erkannt: vorp
```

## Framework detection

By default the resource auto-detects VORP / RSG / QBR / ox_core. If more than one
core runs in parallel, pin it explicitly in `config.lua`:

```lua
Config.Framework = 'rsg'
```

## Standalone (no framework)

With no framework, ownership is tied to the Rockstar license and admin rights run
through ACE:

```
add_ace group.admin dusk_scenes.admin allow
```
