# Studio Aether Docs

Documentation site for Studio Aether resources, built with [Astro Starlight](https://starlight.astro.build/).

## Structure

Content lives in `src/content/docs/resources/<resource-name>/`. Each resource gets the
same set of pages, so the sidebar is generated automatically (`autogenerate` in
`astro.config.mjs`) — add a folder and it appears in the nav.

```
src/content/docs/
├── index.mdx                          # landing page
└── resources/
    └── dusk-knuckles/                 # one folder per resource (kebab-case)
        ├── index.md                   # overview + features
        ├── installation.md
        ├── configuration.md
        ├── commands.md
        ├── frameworks.md
        └── troubleshooting.md
```

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the built site |

## Adding a resource

1. Create `src/content/docs/resources/<name>/`.
2. Copy the page set from an existing resource and fill it in.
3. `npm run build` — the resource appears in the sidebar automatically.

See [AGENTS.md](./AGENTS.md) for the conventions AI agents and contributors follow.
