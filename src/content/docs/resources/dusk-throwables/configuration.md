---
title: Configuration
description: Every setting in config.lua for dusk_throwables, what it does and its default value.
---

Everything lives in `config.lua`, which stays readable after escrow.

## Throw power

| Setting | Default | Purpose |
|---|---|---|
| `BaseVelocity` | `12.0` | Base throw velocity before a charge multiplier is applied. |
| `ChargeSteps` | see below | The three charge stages. |

`ChargeSteps` ships with three stages, checked from the longest hold to the shortest:

| Hold time | Multiplier | Animation |
|---|---|---|
| 1000 ms or more | 1.8 | `throw_h_fb_stand` |
| 200 ms or more | 1.4 | `throw_m_fb_stand` |
| 0 ms (tap) | 1.0 | `throw_l_fb_stand` |

## Distance and timing checks

These are enforced on the server. A client cannot shorten a flight or extend its range by
sending different numbers.

| Setting | Default | Purpose |
|---|---|---|
| `MaxThrowDistance` | `80.0` | Maximum flat distance between the throw point and the detonation point. |
| `MaxThrowSpeed` | `25.0` | Assumed top speed used to compute the minimum flight time for a given distance. |
| `MinFlightTime` | `200` | Lower bound on flight time in ms, independent of distance. |
| `TimingTolerance` | `750` | Latency buffer added to both timing checks, in ms. |
| `MaxThrowDrop` | `400.0` | How far below the throw point a detonation may land. |
| `MaxThrowRise` | `40.0` | How far above the throw point a detonation may land. |
| `MaxFlightTime` | `20000` | After this many ms without a reported detonation, the object is removed and the item refunded. |
| `ArmTimeout` | `60000` | How long a throwable may stay in the hand before it is cancelled and refunded. |
| `ThrowCooldown` | `4000` | Minimum time between two detonations by the same player. |

A detonation reported while the object is still in hand (`cookOnAim` types such as dynamite)
is only accepted once the arm animation and fuse could realistically have burned down, using
`ArmTimeout` and the throwable's own `fuseTime`.

## Broadcast and rendering

| Setting | Default | Purpose |
|---|---|---|
| `ExplosionMode` | `'thrower'` | Who the detonation event is sent to first; see below. |
| `BroadcastRadius` | `300.0` | Radius in which other players receive the detonation. |
| `RenderDistance` | `60.0` | Radius in which a throwable held by another player is rendered locally. |

With `ExplosionMode = 'thrower'`, the throwing client executes the explosion itself and nearby
players receive the gas or fire cloud portion only, if the throwable has one.

## Carrier

| Setting | Default | Purpose |
|---|---|---|
| `CarrierModel` | `` `s_baseball01x` `` | Vanilla prop that carries the physics in flight and stays invisible to everyone. |
| `CarrierSweep` | `200` | Interval, in ms, at which a carrier's visible model is attached or reattached. |

The visible model (for example `dusk_grenade_mk2`) is attached to the carrier on every
client and the carrier itself is hidden, because custom props without proper collision fall
through the world.

## Hand placement

| Setting | Default | Purpose |
|---|---|---|
| `HandOffset` | `{ x = 0.02, y = -0.02, z = -0.02 }` | Position offset of the object in hand. |
| `HandRotation` | `{ x = 0.0, y = 180.0, z = 0.0 }` | Rotation of the object in hand. |

Both can be overridden per throwable with a `hand = { offset = ..., rotation = ... }` block
in that throwable's entry.

## Safe zones

| Setting | Default | Purpose |
|---|---|---|
| `SafeZoneBlastBuffer` | `15.0` | Extra buffer added around every zone radius. |

Eight zones ship by default:

| Zone | Radius |
|---|---|
| Valentine | 130.0 |
| Blackwater | 180.0 |
| Saint Denis | 260.0 |
| Rhodes | 130.0 |
| Strawberry | 120.0 |
| Annesburg | 130.0 |
| Armadillo | 120.0 |
| Tumbleweed | 110.0 |

Set `Config.SafeZones` to `{}` to remove all of them. The check runs on both sides: the
client refuses the throw with a message, the server refuses the explosion independently of
what the client did.

## Logging

| Setting | Default | Purpose |
|---|---|---|
| `Log.console` | `true` | Print detonations, denials and refund failures to the server console. |
| `Log.webhook` | `''` | Discord webhook URL. Empty disables webhook logging. |
| `Log.webhookName` | `'Throwables'` | Username shown on the webhook message. |
| `Log.logDenied` | `true` | Log denied attempts, not only successful detonations. |
| `DeniedLogInterval` | `15000` | How long repeated denials from the same player are collapsed into one log line, in ms. |

## Server sweep

| Setting | Default | Purpose |
|---|---|---|
| `SweepInterval` | `5000` | Interval at which the server clears expired armed and in-flight states and refunds the item. |

## Display

| Setting | Default | Purpose |
|---|---|---|
| `ShowFuseTimer` | `false` | Show a countdown while a fuse is burning. |

## Debug

| Setting | Default | Purpose |
|---|---|---|
| `Debug` | `false` | Registers the `tanim` and `tdrop` client commands, see Troubleshooting. |

## Adding your own throwable

An entry in `Config.Throwables` is enough:

```lua
['lantern'] = {
    item = 'thrown_lantern',
    label = 'Thrown lantern',
    model = `w_throw_lantern01`,
    fuseTime = 4.0,
    impactFuse = true,
    cookOnAim = false,
    explosion = { tag = 24, damageScale = 0.7, audible = true, invisible = false, shake = 0.3 }
}
```

| Field | Meaning |
|---|---|
| `item` | Inventory item name that arms this throwable. |
| `label` | Display label used in logs. |
| `model` | Prop shown in hand and attached to the carrier in flight. |
| `fuseTime` | Seconds until detonation. |
| `impactFuse` | Detonate on the first collision instead of waiting for the full fuse time. |
| `cookOnAim` | Start the fuse the moment the player aims (dynamite behaviour). |
| `armAnim`, `armDuration`, `armFlag` | Animation played while a `cookOnAim` throwable arms. |
| `explosion` | Explosion block, see below. |
| `cloud` | Optional lingering particle cloud with a damage tick, see below. |
| `carrierOffset` | Shifts the visible model against the carrier if it does not sit centred. |
| `hand` | Optional `{ offset, rotation }` override of `HandOffset` and `HandRotation`. |

The model needs no collision of its own; the carrier provides the physics.

An `explosion` block:

| Field | Meaning |
|---|---|
| `tag` | Native explosion tag. |
| `damageScale` | Damage multiplier of the explosion. |
| `audible` | Whether the explosion is audible. |
| `invisible` | Whether the explosion is visually hidden. |
| `shake` | Camera shake amount. |

A `cloud` block, used by the poison gas bottle:

| Field | Meaning |
|---|---|
| `ptfxDict`, `ptfxName` | Particle effect asset and effect name. |
| `scale` | Particle effect scale. |
| `radius` | Radius in which the cloud deals damage. |
| `duration` | How long the cloud lasts, in ms. |
| `tickInterval` | Time between damage ticks, in ms. |
| `tickDamage` | Damage per tick. |

## Objects that hit instead of exploding

Instead of `explosion`, an entry can carry an `impact` block. On collision the client fires an
invisible shot at the impact point that inherits the damage profile of the named weapon,
including hit reaction and kill attribution to the thrower. `explosion` and `impact` are
mutually exclusive; if both are present, `impact` wins.

```lua
impact = {
    weapon = `WEAPON_THROWN_THROWING_KNIVES`,
    damage = 12,
    speed = 1000.0,
    audible = true,
    invisible = true,
    probeAbove = 0.5,
    probeBelow = 0.3
}
```

| Field | Meaning |
|---|---|
| `weapon` | Weapon whose damage profile the hit inherits. |
| `damage` | Damage of the hit. |
| `speed` | Speed of the hit trace, keep it high. |
| `audible` | Play the hit sound. |
| `invisible` | Set to `false` to see the trace fly, for debugging only. |
| `probeAbove`, `probeBelow` | Length of the trace above and below the impact point. |

The trace runs straight through the impact point. An object that hits nothing does no
damage. The hit is executed only by the throwing player's own client, by design: otherwise
every client in range would trigger the same hit and the damage would multiply.
