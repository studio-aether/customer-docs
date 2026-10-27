---
title: Configuration
description: All settings in config.lua of aether_portal.
---

Everything you can change lives in `config.lua`, which stays readable after escrow.

## Portals

```lua
Config.Portals = {
    valentine = {
        label = 'Portal to Rhodes',
        coords = vector3(-271.5, 822.0, 118.8),
        heading = 190.0,
        destination = vector4(1354.9, -1306.85, 76.94, 0.0),
        active = false,
        use = 'prompt',
    },
}
```

| Field | Meaning |
|---|---|
| key (`valentine`) | Portal id, used by commands and exports |
| `label` | Title shown above the prompt |
| `coords` | Base point of the portal on the ground |
| `heading` | Direction the portal faces; players use it from the front |
| `destination` | Teleport target, `w` is the heading after arrival. Leave it out to only fire the event. |
| `active` | State after server start |
| `use` | `prompt`, `walk` or `export`; without it `Config.Use.mode` applies |

`portalpos` prints your current position as a `coords` line, and `portalplace` prints the
whole entry, so you rarely type coordinates by hand.

## Use modes

| Mode | Behaviour |
|---|---|
| `prompt` | A prompt appears in front of the active portal, holding the key teleports |
| `walk` | Walking into the zone in front of the portal teleports right away |
| `export` | No prompt and no zone; only `exports.aether_portal:Use(id)` triggers it |

## Config.Use

| Key | Default | Meaning |
|---|---|---|
| `mode` | `'prompt'` | Use mode for portals without their own `use` |
| `keyName`, `key` | `INPUT_ENTER`, `0xCEFD9220` | Prompt key, E on keyboard |
| `holdMs` | `800` | How long the key has to be held |
| `distance` | `1.8` | Prompt range around the spot in front of the portal |
| `walkRadius` | `1.5` | Zone size in `walk` mode |
| `maxServerDistance` | `8.0` | How close a player must be for the server to accept a use |

## Config.Teleport

| Key | Default | Meaning |
|---|---|---|
| `fadeOut` | `900` | Fade to black in milliseconds |
| `hold` | `500` | Time on black after arrival |
| `fadeIn` | `1200` | Fade back in milliseconds |
| `cooldown` | `5000` | Pause before the same player can use a portal again |

## Other settings

| Key | Meaning |
|---|---|
| `Config.StreamDistance` | Distance in metres at which a portal is created on a client |
| `Config.Light` | Colour, range and intensity of the light inside an active portal |
| `Config.TestPortal` | Distance and destination of the `portaltest` portal |
| `Config.Texts` | Every text the resource shows, prompt and chat messages |
