---
title: Commands
description: The admin command of aether_fogofwar.
---

## Admin command

```
fog reveal|peek|reset|stats [playerId]
```

The command name comes from `Config.AdminCommand` (default `fog`). It can be run from the
server console or by a player holding the `Config.AdminAce` ACE (default
`aether_fogofwar.admin`). Without `playerId` it targets the player running the command; from
the server console a `playerId` is required.

| Subcommand | Does |
|---|---|
| `reveal` | Marks the target character's map fully explored, permanently. |
| `peek` | Lifts the fog for the target's current session only, without changing stored progress. |
| `reset` | Wipes the target character's exploration and discoveries. |
| `stats` | Prints the explored percentage and discovery count to the console. |

Running the command with an unknown or missing subcommand prints its usage line.
