---
title: Aether Phonograph
description: Placeable music devices for RedM with curated audio and server-authoritative, synced playback.
---

`aether_phonograph` adds placeable music devices with curated audio, native prompts and
server-authoritative playback. Everyone near a device hears the same thing at the same point
of the same piece, including a player who walks up halfway through.

## Features

- Two devices shipped: a gramophone with a turntable interface, and a radio with a tuning
  dial interface. Each has its own model, its own item and its own interface.
- 71 curated tracks from 1898 to 1920, sourced from the Internet Archive's public-domain 78
  rpm collection and the Lummis wax cylinder field recordings of 1904 and 1905. Eight tracks
  ship as local audio files so playback does not depend on archive.org being reachable.
- Server-authoritative playback. The server holds what is playing, since when and how loud;
  clients compute their own position in the piece from server time, so two players at the
  same device are never out of step with each other.
- Items create themselves. Any item slug named in `Config.Devices` or `Config.Item` that is
  missing from your inventory table is inserted on start using the definition in
  `Config.Items`. An item that already exists is never touched.
- Renaming a device costs no code. Every text a device shows is looked up as
  `<locale>_<key>` first and falls back to `device_<key>`, so a receiver can become a
  wireless set with a locale file edit.
- Surface noise. A looping crackle track plays under the music, coupled to the device
  volume and can be silenced per player.
- Placement is aimed, not steered with keys. A ground query keeps furniture standing on
  tables and crates instead of snapping to the floor below.
- Permissions. `Config.Placement.PickUpBy` decides who may pick a device back up, and the
  ACE in `Config.Admin.Ace` lifts that restriction for staff either way.

## Requirements

- A RedM server (`rdr3`).
- `jo_libs`, `oxmysql` and `xsound`, all started before this resource.
- A framework supported by `jo_libs`.

The database schema applies itself on first start; there is no SQL file to run.

## Quick facts

| | |
|---|---|
| Resource name | `aether_phonograph` |
| Version | 0.2.0 |
| Game | RedM (`rdr3`) |
| Dependencies | `jo_libs`, `oxmysql`, `xsound` |
| Database | `oxmysql`, schema applies itself on first start |
| Open after escrow | `config.lua`, `locales/en.lua`, `locales/de.lua` |

## Shipped devices

| Device id | Model | Interface | Item | Locale prefix |
|---|---|---|---|---|
| `gramophone` | `p_phonograph01x` | `gramophone` (turntable) | `phonograph` | `gramophone` |
| `speaker` | `aether_radio01x` | `radio` (tuning dial) | `radio` | `radio` |

The radio's model, `aether_radio01x`, streams with the resource. RDR2 itself ships no radio
prop, since the game is set in 1899, two decades before the first broadcast.

## Pages

- [Installation](/customer-docs/resources/aether-phonograph/installation/)
- [Configuration](/customer-docs/resources/aether-phonograph/configuration/)
- [Troubleshooting](/customer-docs/resources/aether-phonograph/troubleshooting/)
