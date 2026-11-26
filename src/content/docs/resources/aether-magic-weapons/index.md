---
title: Aether Magic Weapons
description: "Aether Magic Weapons is a RedM resource for VORP with six magic weapons whose hits slow, burn, poison or drain the target, with auras every nearby player can see."
head:
  - tag: title
    content: "Aether Magic Weapons - RedM Magic Weapons with On-Hit Effects | Studio Aether"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"SoftwareApplication\",\"name\":\"Aether Magic Weapons\",\"description\":\"Aether Magic Weapons is a RedM resource for VORP with six magic weapons whose hits slow, burn, poison or drain the target, with auras every nearby player can see.\",\"applicationCategory\":\"GameApplication\",\"operatingSystem\":\"RedM server (FXServer)\",\"url\":\"https://studio-aether.github.io/customer-docs/resources/aether-magic-weapons/\",\"publisher\":{\"@id\":\"https://studio-aether.tebex.io/#organization\"}}"
---

`aether_magicweapons` adds magic weapons to a VORP server. Each one is an inventory item: using
it summons its base weapon into the player's hand, and every hit with it triggers a magic
effect that nearby players see. Using the item again dismisses the weapon.

## Weapons

| Item | Base weapon | Effect on hit |
|---|---|---|
| `mw_frost_dagger` | Knife | Slows the target for 3 s with a burst of snow; the drawn dagger trails snow |
| `mw_fire_sword` | Machete | Sets the target on fire for 3 s; the drawn blade burns |
| `mw_lifesteal_dagger` | Knife | Heals the wielder by 25 % of the damage, a blood stream flows to the wielder; faint red mist on the blade |
| `mw_poison_dagger` | Knife | Poison damage over time; faint green mist on the blade |
| `mw_frost_bow` | Bow | Arrow hits slow the target with a burst of snow; the drawn bow trails snow |
| `mw_fire_bow` | Bow | Arrow hits set the target on fire for 3 s; the drawn bow burns |

## Features

- **Items, not loadout weapons** — the weapon exists only while it is summoned. Holstering,
  switching, dying or losing the item removes it and gives back the weapon held before.
- **Server-validated hits** — weapon, distance, cooldown, rate limit and item ownership are
  checked on the server before an effect fires.
- **Kill credit stays with the wielder** — hunting and bounty scripts still see the player as
  the killer.
- **Visible to everyone nearby** — hit effects and weapon auras are shown to players in range.
- **Capped effects** — slow, burn, heal and poison are clamped by hard limits in `config.lua`.
- **Add your own weapons** — one entry in `Config.Weapons` per weapon.
- **Idle cost zero** — no threads run while no magic weapon is drawn.
- **Six languages** — English, German, French, Portuguese, Spanish and Thai.

## Quick facts

| | |
|---|---|
| Resource name | `aether_magicweapons` |
| Version | 1.0.0 |
| Game | RedM (`rdr3`) |
| Framework | VORP (`vorp_core`, `vorp_inventory`) |
| Database | `oxmysql`; items are created automatically |
| Open after escrow | `config.lua`, `locales/` |

## Requirements

- A RedM server with OneSync.
- `vorp_core`, `vorp_inventory`, `oxmysql`.

## Pages

- [Installation](/customer-docs/resources/aether-magic-weapons/installation/)
- [Configuration](/customer-docs/resources/aether-magic-weapons/configuration/)
- [Troubleshooting](/customer-docs/resources/aether-magic-weapons/troubleshooting/)
- [Changelog](/customer-docs/resources/aether-magic-weapons/changelog/)
