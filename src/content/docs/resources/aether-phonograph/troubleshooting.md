---
title: Troubleshooting
description: Symptoms, causes and the phonoitems command for aether_phonograph.
---

## The phonoitems command

Run `phonoitems` from the server console, or from a player's F8 console if that player holds
the `Config.Admin.Ace` ACE. It reports which item slugs are wanted, how many were created and
how many already existed. When run from a player's console the report is also sent back to
that player, since the server log is not visible to them.

If items were newly created, restart your inventory resource too, or it will not know about
them yet.

## Symptoms and their causes

| What you see | What it is |
|---|---|
| A track is silent, no error anywhere | The host does not send `Access-Control-Allow-Origin`. See Configuration, Tracks. |
| Using the item does nothing | The slug could not be created and is not in your inventory table; the startup log says which. Run `phonoitems` to check. If your framework defines items in Lua files instead of a database table, `Config.CreateItems` has no effect there and you register the slug yourself. |
| The device is placed but invisible | The prop named in `model` is not streamed on your server. |
| The prop stands still while playing | Its `anim` block is missing, or the animation dictionary did not stream in. Cosmetic only. |
| Music is audible far too far away | `Config.Audio.HearingDistance` and `Config.Audio.RefDistance` both shape the falloff; the second is the radius of full volume. |
| Nobody can place a second device | `Config.Placement.MaxPerCharacter` is set. It counts per character across all device types; `false` switches it off. |

## Schema setup failed

On start, the resource applies its database migrations before anything else can run. If a
migration fails, the console prints `Schema setup failed -- bootstrap aborted.` and the
resource does not register any items or events. Check the printed statement and error, fix
the underlying database issue, and restart the resource.
