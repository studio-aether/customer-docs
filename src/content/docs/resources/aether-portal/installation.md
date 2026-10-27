---
title: Installation
description: Requirements and setup for aether_portal.
---

## Requirements

- A RedM server (`rdr3`) with OneSync.
- No framework, no database, no other resource.

## Setup

1. Copy `aether_portal` into your `resources` folder.
2. Add `ensure aether_portal` to `server.cfg`.
3. Give your staff the command permission, for example `add_ace group.admin command allow`,
   or grant the single commands listed on the Commands page.
4. Restart the server.

## Updating

Replace the whole `aether_portal` folder, do not merge it. Back up your `config.lua` first and
copy it back afterwards.

The resource streams its model and animations. Restart the server after an update instead of
restarting the resource while players are connected, otherwise clients keep the old streamed
files.

## Checking it works

1. Join as an admin and run `portaltest`. A portal appears seven metres in front of you and
   opens right away.
2. Walk up to it. The prompt `Enter portal` appears; hold E to teleport.
3. Run `portaltest` again to remove it.
