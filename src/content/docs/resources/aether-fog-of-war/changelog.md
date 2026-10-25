---
title: Changelog
description: Release history of Aether Fog of War for RedM.
sidebar:
  order: 90
---

## 1.0.1 (2026-10-25)

- Progress reaches the database within seconds: the client reports new cells
  every 5 seconds instead of 20, the server writes changed maps every 10 seconds
  instead of 60, so a crash or a killed server process no longer loses the last
  minute of exploration
- Every map is saved when txAdmin announces a shutdown or restart
- A resource stop saves the map of every player online, not only the first one
- A fully revealed map stays fully revealed after relog
- RSG, QBR, QR and RPX: progress is saved per character. These cores report
  the character through the citizen id, which 1.0.0 did not read, so no map
  was ever stored there
- RedEM: progress is saved per character. RedEM numbers characters per
  account, so in 1.0.0 the first character of every player shared one map;
  the owner is now the identifier plus that number
- `account` mode on RSG, QBR, QR and RPX shares one map across the characters
  of a player, keyed by the Rockstar license, instead of one map per character
