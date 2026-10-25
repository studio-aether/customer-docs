---
title: Changelog
description: Release history of Aether Phonograph for RedM.
sidebar:
  order: 90
---

## 0.2.3 (2026-10-25)

- RSG v1 and v2, QBR, QR and RPX: devices, favourites and the device limit belong to the
  character. jo_libs reports the character on these cores as the citizen id and sends
  charid 0, which 0.2.2 took for the character, so every player counted as the owner of every
  device. Devices placed under 0.2.2 on these cores are stored with owner `0` and have no
  owner now.
- RedEM: devices, favourites and the device limit belong to the character. RedEM numbers
  characters per account, so the first character of every player shared one owner; the key is
  now the identifier plus that number.
- The pick-up prompt asks the server for the player's own character instead of the jo_libs
  identifier cache, which kept the first character after a character switch. The lookup no
  longer hangs while no character is loaded.
- A charid of 0 no longer counts as a character on any core.
