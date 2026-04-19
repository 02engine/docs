# 02Engine Docs

https://docs.02engine.org/

This repository contains the public documentation for 02Engine.

## Local Development

The docs site is built with [Docusaurus](https://docusaurus.io/) and uses Bun for normal local commands.

Install dependencies:

```powershell
bun install
```

Start the development server:

```powershell
bun run start
```

Build the production site:

```powershell
bun run build
```

Serve a local production build:

```powershell
bun run serve
```

Clear Docusaurus caches:

```powershell
bun run clear
```

## Writing Content

Most documentation pages live in the `docs` folder and are written in Markdown or MDX.

When adding a new page:

1. Create the page under the most appropriate folder.
2. Add front matter with a stable `slug` when the public URL matters.
3. Add the page to `sidebars.js`.
4. Run `bun run build` to catch broken links and MDX errors.

## Documentation Direction

02Engine is based on Scratch and TurboWarp, but the documentation should describe 02Engine's real behavior first. Keep inherited upstream pages where they are still useful, but prefer 02Engine-specific names, workflows, screenshots, and limitations.
