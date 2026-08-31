---
title: Troubleshooting
description: Common dusk_knuckles issues and how to diagnose them.
---

## "Model is unknown to the client"

The client joined before the resource was started, so the model never reached their
streaming cache. **Reconnect once.**

## Prop lags behind the hand

Run `knuckles_debug`. During the three-second diagnostic:

- `max bone distance` above **0.30 m**, or
- `attach repairs` above **0**

means the attachment is being broken by another resource (e.g. another script re-attaching
or parenting the same ped).

## Knuckles stay on after the item is gone

`Config.RevalidateSeconds` controls how fast the server notices the item left the
inventory. The minimum is **5 seconds**. Ownership is checked server-side, never trusted
from the client.

## knuckles_debug reference

The command prints a small report; the healthy values are:

| Field | Healthy |
|---|---|
| `prop exists` | `true` |
| `prop attached` | `true` |
| `attach repairs` | `0` |
| `max bone distance` | `< 0.30 m` |
| `props in pool` | `1` |
| `bone ... index` | not `-1` |
