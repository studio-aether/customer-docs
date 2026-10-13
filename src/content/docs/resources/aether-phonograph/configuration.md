---
title: Configuration
description: Every option in config.lua for aether_phonograph, what it does and its default value.
---

Everything lives in `config.lua`, which stays readable after escrow.

## Devices

`Config.Devices` binds a prop, an interface and a set of texts together. Each entry carries:

| Field | Meaning |
|---|---|
| `id` | Internal key of the device. |
| `model` | The prop that gets placed. |
| `item` | The inventory item that places it. Falls back to `Config.Item` if omitted. |
| `ui` | Which interface opens: `gramophone` (turntable) or `radio` (tuning dial). |
| `locale` | Prefix its texts are looked up under, see Language below. |
| `tracks` | Optional list of track ids this device may play. Omit for the whole library. |
| `anim` | Optional prop animation while playing. Omit for a device that just stands there. |

Each device has its own item. A radio and a gramophone are two different objects; a player
carries one or the other. Pointing two devices at the same item means the first one wins.

## Items

| Setting | Default | Purpose |
|---|---|---|
| `Config.Item` | `'phonograph'` | Fallback inventory item, used by any device that does not name its own. |
| `Config.CreateItems` | `true` | Create missing item slugs on start. `false` keeps this resource out of your item table entirely. |
| `Config.Items` | see below | Definitions used when a missing slug is created. |

`Config.Items` ships two entries, `phonograph` and `radio`, each with a `label`, `limit`,
`weight` and `description`. See [Installation](/customer-docs/resources/aether-phonograph/installation/)
for how creation behaves.

## Controls

| Setting | Default | Binding |
|---|---|---|
| `Use` | `'INPUT_CONTEXT_Y'` | E |
| `PickUp` | `'INPUT_INTERACT_ANIMAL'` | G |
| `ScrollUp` | `'INPUT_PREV_WEAPON'` | Mouse wheel up |
| `ScrollDown` | `'INPUT_NEXT_WEAPON'` | Mouse wheel down |
| `HeightModifier` | `'INPUT_SPRINT'` | Shift, held: wheel changes height instead of rotation |
| `Accept` | `'INPUT_ENTER'` | E |
| `Cancel` | `'INPUT_FRONTEND_CANCEL'` | Backspace or Esc |

These are control names, resolved to hashes at runtime, not hand-copied hex values.

## Placement

| Setting | Default | Purpose |
|---|---|---|
| `GhostAlpha` | `160` | Transparency of the placement ghost, out of 255. |
| `MaxPerCharacter` | `false` | How many devices one character may have standing at once. `false` disables the limit. |
| `PickUpRange` | `2.0` | Distance at which a device may still be picked back up. |
| `PickUpBy` | `'owner'` | `'owner'` limits pick-up to whoever placed it (plus `Config.Admin.Ace`); `'anyone'` opens it to any player who can reach it. |
| `AimDistance` | `20.0` | How far the aiming ray reaches. Past this the ghost stops following and waits. |
| `RotationStep` | `5.0` | Rotation change per wheel notch. |
| `HeightStep` | `0.05` | Height change per wheel notch. |
| `HeightMin` | `-1.0` | How far the device may be lowered from the surface it was aimed at. |
| `HeightMax` | `2.5` | How far the device may be raised from the surface it was aimed at. |
| `GroundSnap` | `0.5` | How far the reported ground may be from the aim hit point before the hit point itself wins. |

The ground query corrects the aim rather than replacing it, which is what lets a device sit
on a tabletop instead of dropping through it to the floor.

## Streaming

| Setting | Default | Purpose |
|---|---|---|
| `SpawnDistance` | `60.0` | Radius in which placed devices are spawned client-side. |
| `TickMs` | `1000` | Interval of the streaming check. |
| `PromptRange` | `1.8` | Radius in which the interaction prompt is offered. |

## Audio

| Setting | Default | Purpose |
|---|---|---|
| `HearingDistance` | `18.0` | Radius where the music has faded to nothing. |
| `ReleaseDistance` | `30.0` | Radius where the sound is actually torn down. Larger than `HearingDistance` so the fade finishes before the audio graph is destroyed. |
| `RefDistance` | `3.0` | Radius of full volume for the distance falloff. |
| `RolloffFactor` | `1.4` | Falloff steepness. |
| `MaxActiveSources` | `3` | Only the nearest audible devices this many get a live audio graph; the rest stay silent. |
| `DefaultVolume` | `0.35` | Default device volume. |
| `ResyncIntervalMs` | `30000` | How often a client recomputes its playback offset against server time. |
| `Lowpass.frequency` | `3200.0` | Kept for the menu display; `xsound` applies no filter stage itself. |
| `Lowpass.q` | `0.7` | Same. |
| `Saturation` | `0.35` | Same. |
| `Crackle.enabled` | `true` | Play the surface noise loop under the music. |
| `Crackle.gain` | `0.055` | Volume of the crackle loop, relative to the device volume. |
| `Crackle.file` | `'audio/crackle.mp3'` | Crackle audio file. |
| `Occlusion.enabled` | `true` | Reduce volume when the line of sight to the device is blocked. |
| `Occlusion.gain` | `0.45` | Volume factor applied while occluded. |

## Tracks

`Config.Tracks` is the curated library: 71 titles from 1898 to 1920. A track carries either
`file` (an MP3 inside this resource) or `url` (a host of your own); a track never falls back
from one to the other. A remote track only plays if its host sends
`Access-Control-Allow-Origin`; without that header the audio graph stays silent and nothing
is logged anywhere, since that is a browser rule rather than a fault in this resource.
`duration` is optional: the first client to play a track measures its real length and reports
it back, and the server remembers that until it restarts.

A track can carry a `devices` field, for example `devices = { 'speaker' }`, to restrict it to
one device. Five spoken-word tracks ship this way and play on the radio only. A device can
also restrict itself the other way with its own `tracks` list in `Config.Devices`.

## Playlists

| Setting | Default | Purpose |
|---|---|---|
| `Config.Playlists.Enabled` | `true` | Let characters keep favourites out of the curated list. |
| `Config.Playlists.MaxPerCharacter` | `12` | How many favourites one character may store. |

There is no free URL entry for players; the favourites list can only reference tracks already
in `Config.Tracks`.

## Language

| Setting | Default | Purpose |
|---|---|---|
| `Config.Language` | `'en'` | Default language. |

Two languages ship, `en` and `de`. A missing key falls back to English, and a key missing
there too is shown as itself rather than as blank space. Every text a device shows is looked
up as `<locale>_<key>` first (the device's own `locale` field) and falls back to
`device_<key>`, so renaming a device only needs the handful of keys that actually differ.

## Admin

| Setting | Default | Purpose |
|---|---|---|
| `Config.Admin.Ace` | `'aether_phonograph.admin'` | ACE permission that lifts the `PickUpBy` restriction and is required to run `phonoitems` from a player's F8 console. |

## Debug

| Setting | Default | Purpose |
|---|---|---|
| `Config.Debug` | `false` | Print bootstrap and framework detection details to the server console. |
