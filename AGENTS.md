# Studio Aether Docs — Agent & Contributor Guide

Astro Starlight site documenting Studio Aether resources. Content is Markdown; the
sidebar is auto-generated, so there is no manual nav to maintain.

## Content layout

- `src/content/docs/` — all documentation pages.
- `src/content/docs/resources/<resource>/` — one folder per resource, **kebab-case**
  (e.g. `dusk-knuckles` for the `dusk_knuckles` resource).
- `astro.config.mjs` — site config + `autogenerate` sidebar (do not list pages by hand).

## Required frontmatter

Every page needs at least:

```yaml
---
title: Page Title
description: One-sentence summary.
---
```

## Standard page set

Each resource ships the same pages. Copy from an existing resource and fill in:

1. `index.md` — overview, features, quick-facts table.
2. `installation.md` — requirements + setup steps.
3. `configuration.md` — every `config.lua` setting in a table.
4. `commands.md` — console commands / fitting tools.
5. `frameworks.md` — framework bridge / porting to other cores.
6. `troubleshooting.md` — common issues + diagnostics.

## Conventions

- Docs are **customer-facing**, written in English.
- Resource facts must match the shipped `README.md`, `fxmanifest.lua` and `config.lua` —
  read those before documenting, never invent settings.
- Internal-only content (deployment, DB schemas, secrets) does **not** belong here; it
  lives in the private/internal docs.
- Theme is "Mission Control": void-black `#020914`, cyan `#00e5ff`, green `#00ff88`
  (see `src/styles/custom.css`).

## Commands

- `npm run dev` — dev server on `localhost:4321`.
- `npm run build` — production build to `dist/`. Run this before committing to catch
  content/config errors.

## Verify before done

- `npm run build` passes with no errors.
- The new resource shows up in the sidebar and every page route is generated.
