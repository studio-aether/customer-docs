# Studio Aether Docs

Documentation site for Studio Aether resources, built with [Astro Starlight](https://starlight.astro.build/).

## Structure

Content lives in `src/content/docs/resources/<resource-name>/`. Each resource gets the
same set of pages, so the sidebar is generated automatically.

```
src/content/docs/
├── index.mdx
└── resources/
    └── dusk-knuckles/
        ├── index.md          # overview + features
        ├── installation.md
        ├── configuration.md
        ├── commands.md
        ├── frameworks.md
        └── troubleshooting.md
```

## Development

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the built site |
