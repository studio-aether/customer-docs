---
title: Other frameworks
description: Porting dusk_knuckles to a framework that jo_libs does not cover.
---

Every framework call lives in `server/bridge.lua`, which stays readable after escrow.
It exposes four functions:

| Function | Purpose |
|---|---|
| `Bridge.registerUseItem(item, callback)` | Register the item as usable. |
| `Bridge.itemCount(src, item)` | Count a player's items. |
| `Bridge.hasItem(src, item)` | Check ownership. |
| `Bridge.notify(src, text)` | Send a notification to a client. |

Rewrite those four bodies and the resource runs on any core. The rest of the code only
talks to the `Bridge` table, never to `jo_libs` directly — so a port is a matter of
swapping these functions, not touching the logic.
