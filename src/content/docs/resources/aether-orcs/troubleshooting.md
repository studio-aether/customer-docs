---
title: Troubleshooting
description: What to check when the orcs or the ogre do not show up.
---

## The model is invalid or does not load

The first install needs a full server restart, a resource restart is not enough. Also check
that `aether_orcs` is started.

## The wrong character appears

The outfit number picks the character. Use the model and outfit pair from the overview
table.

## The ogre looks normal sized to other players

Ped scale is not networked. Every client has to apply it, see
[Spawn with your own script](/customer-docs/resources/aether-orcs/spawning/). With
`aether_goblins` this is handled for you.

## A cook in orc gear walks around

The pack replaces clothing of the vanilla ped `cs_mp_camp_cook`. If another script or the
game spawns that ped, he wears orc gear.

## The goblins menu tile is empty

Add `orc_grimfang.png` and the other pictures to `aether_goblins/nui/assets/`, or set a
`portrait` on the entry.
