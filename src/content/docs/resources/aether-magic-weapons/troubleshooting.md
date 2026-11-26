---
title: Troubleshooting
description: Symptoms, causes and known limitations of aether_magicweapons.
---

| What you see | What it is |
|---|---|
| Item does not exist or cannot be used | `vorp_inventory` has not loaded the new items yet. Restart the server once after the first start. |
| Weapon disappears right after summoning | A weapon anticheat removed it. Whitelist it through `Config.AntiCheat.clientEvent`. |
| Magic bow does not shoot | The player has no arrows. Magic bows shoot the player's own arrows from the VORP inventory. |
| No effect on hit | The hit was out of `Config.Range`, the weapon is on cooldown, or the item is no longer in the inventory. |
| Another player sees no aura | They came into range after the weapon was drawn. The aura appears on the next draw. |
| Normal knife gone from the hand | The same weapon was equipped from the inventory while the magic weapon was out. Unequip and equip it again in the inventory. |

## Known limitations

- The summoned weapon is not part of the VORP loadout.
- If the player already carries the base weapon, that weapon is used and is not removed when
  dismissing.
- Losing the item is noticed on the next hit or the next use of the item.
- A target that dies from fire is not credited to the wielder.
- Animals can be slowed, poisoned and burned; lifesteal heals only player characters.
- Hits on NPCs managed by the attacker's own client are reported by that client. The server
  checks ownership, distance, cooldown and the item, but cannot prove the hit happened. Player
  targets always go through the server.
