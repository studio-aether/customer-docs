---
title: Use with Aether Goblins
description: Add the orcs and the ogre to the ambush points and spawn menu of aether_goblins.
---

Needs `aether_goblins` 1.2.0 or newer. Combat, health, aggro, ambush points and the spawn
menu come from there, so nothing exists twice.

## Config entries

Add these entries to `Config.Goblins` in the `aether_goblins` config, before its closing
brace:

```lua
    { id = 'orc_grimfang', label = 'Grimfang', model = 'aether_orc_grimfang', outfit = 0, weapon = 'machete', scale = 1.0, health = 600 },
    { id = 'orc_ironhide', label = 'Ironhide', model = 'aether_orc_ironhide', outfit = 1, weapon = 'hatchet', scale = 1.04, health = 700 },
    { id = 'orc_ironjaw', label = 'Ironjaw', model = 'aether_orc_ironjaw', outfit = 2, weapon = 'cleaver', scale = 1.02, health = 650 },
    { id = 'ogre_grimhide', label = 'Grimhide', model = 'aether_ogre_grimhide', outfit = 3, weapon = 'fists', scale = 1.3627, health = 1500 },
```

Add these entries to `Config.Weapons`, before its closing brace:

```lua
    { id = 'hatchet', weapon = 'WEAPON_MELEE_HATCHET' },
    { id = 'cleaver', weapon = 'WEAPON_MELEE_CLEAVER' },
    { id = 'fists', weapon = 'WEAPON_UNARMED' },
```

Restart the whole server once. Ped metadata does not load on a resource restart.

## Spawn

In the console, without a slash:

```
goblin orc_grimfang 2
goblin ogre_grimhide 1
goblin mix 6
```

An ambush point with orcs only:

```lua
{ coords = vec3(0.0, 0.0, 0.0), radius = 40.0, amount = 3, type = 'orc_ironhide', chance = 35, cooldown = 600 }
```

`type = 'mix'` draws from every type in `Config.Goblins`, goblins, orcs and the ogre
together. To keep them apart, name a type per ambush point.

The size of each type comes from its `scale`. A scale given in the command, the menu or an
export wins over it.

## Menu pictures

The `goblins` menu shows a picture per type from `aether_goblins/nui/assets/<id>.png`, for
example `orc_grimfang.png`. Without a file the tile stays empty. The pictures are not part
of this pack. A `portrait` field on the entry points the menu at a different file.
