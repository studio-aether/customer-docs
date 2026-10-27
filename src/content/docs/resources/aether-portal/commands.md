---
title: Commands
description: Admin commands of aether_portal for switching, placing and removing portals.
---

All commands are restricted. A player needs the ACE `command.<name>` for each one, or
`command` for all of them, for example `add_ace group.admin command allow`. The server console
can run `portal` and `portalremove` as well.

| Command | Effect |
|---|---|
| `portal <id> on` | Opens a portal |
| `portal <id> off` | Closes a portal |
| `portal <id> toggle` | Switches a portal |
| `portalplace <id>` | Places a portal at your position, facing you. If the id was placed before, it moves. |
| `portaltarget <id>` | Sets the destination of a placed portal to your position and heading |
| `portalremove <id>` | Removes a placed portal |
| `portaltest` | Test portal seven metres in front of you, open, with the test destination. Run again to remove. |
| `portalpos` | Prints your position as a `coords` line, for any player |

## Placing a portal in game

1. Stand where the portal should be and face the direction players should come from.
2. `portalplace mine` creates the portal and opens it.
3. Ride to the destination, face the way players should look on arrival, run
   `portaltarget mine`.
4. Both commands print the values. Copy them into `Config.Portals` to keep the portal after a
   restart; placed portals last until the server restarts.

Portals from `config.lua` cannot be moved or removed by command; `portal` switches them.
