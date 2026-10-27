---
title: Troubleshooting
description: Symptoms and causes for aether_portal.
---

| What you see | What it is |
|---|---|
| No portal at the coordinates | The player is further away than `Config.StreamDistance`, or the coordinates sit under the ground. Check with `portalpos` where you stand. |
| Portal is there, no prompt | The portal is closed (`portal <id> on`), the player is not in front of it but behind, or its `use` is `walk` or `export`. |
| Command does nothing | The player lacks the ACE for it. See the Commands page. |
| Ring does not move, runes dark | The portal is closed. Opening it starts the ring and the glow. |
| Model invisible or old after an update | The resource was restarted while players were connected. Restart the server, and clear the server cache folder if it persists. |
| Teleport lands in the air or under the map | The `destination` z value is off. Stand at the spot and use `portaltarget` or `portalpos`. |
| A portal placed in game is gone | Placed portals last until the server restarts. Copy the printed line into `Config.Portals`. |
| `portalplace` refuses an id | That id belongs to a portal from `config.lua`, which can only be changed there. |
