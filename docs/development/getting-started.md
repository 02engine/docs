---
slug: /development/getting-started
sidebar_position: 2
hide_table_of_contents: false
---

# Getting Started

02Engine development uses Bun as the normal package and script runner. Do not use `npm install`, `npm run`, or `npm test` for routine work in the 02Engine GUI repository unless a specific repository README says otherwise.

## Requirements

Install:

- [Git](https://git-scm.com/download)
- [Bun](https://bun.sh/)
- Node.js 18 or newer for tools that still execute Node directly

02Engine is large. Keep several gigabytes of free disk space available and expect first builds to take time.

## Repository Layout

The core repositories are usually developed as sibling folders:

```text
02engine-workspace/
  scratch-gui/
  scratch-vm/
  scratch-blocks/
  scratch-render/
  scratch-paint/
  docs/
```

The most commonly edited repositories are:

- **scratch-gui**: React editor UI, New UI windows, settings, extension library, addons, project loading shell.
- **scratch-vm**: project runtime, compiler, extension manager, custom reporters, direct JavaScript support, runtime limits.
- **scratch-blocks**: Blockly/Scratch block rendering, toolbox, block shapes, workspace behavior.
- **scratch-render**: WebGL renderer, pen, stage drawing, touching behavior, high quality render support.
- **scratch-paint**: costume editor.
- **docs**: this documentation site.

## Clone and Run scratch-gui

```powershell
git clone https://github.com/02Engine/scratch-gui
cd scratch-gui
bun install
bun run start
```

The development editor is usually available at:

```text
http://localhost:8601/
```

## Common GUI Commands

```powershell
bun run start
bun run build
bun run test
bun run test:lint
bun run test:unit
bun run test:integration
bun run test:smoke
bun run watch
bun run sync:credits
bun run sync:penguinmod
```

Use the scripts from the repository's `package.json` as the source of truth.

## Building Docs

The docs site is also a Docusaurus project and can be run with Bun:

```powershell
cd C:\Users\DDguan\Documents\GitHub\docs
bun install
bun run start
bun run build
```

## Developing GUI and VM Together

When changing VM behavior, test it through the GUI. The GUI consumes `scratch-vm` from `node_modules`, so you need to point it at your local VM build or local package path.

Recommended workflow:

1. Keep `scratch-gui` and `scratch-vm` as sibling folders.
2. Make VM changes in `scratch-vm`.
3. Build or watch the VM package if that repository requires it.
4. Ensure `scratch-gui/node_modules/scratch-vm` resolves to the local VM version you are testing.
5. Restart or rebuild the GUI after dependency-level changes.

Different machines use different linking strategies. Prefer the method already used in your workspace, and avoid mixing package managers.

## Development Rules of Thumb

- Test both Old UI and New UI when touching editor layout, Blockly, tabs, addons, or target selection.
- Test a project with many blocks when touching the blocks container, flyout, toolbox, workspace metrics, or snapshots.
- Test extension load, reload, and batch import when touching the extension library or VM extension manager.
- Test desktop persistence when changing settings stored in local storage or desktop storage.
- Use Bun commands in documentation, scripts, and release instructions unless there is a strong reason not to.

## Production Build

```powershell
bun run build
```

If a deployment needs environment variables such as `NODE_ENV`, `ROOT`, or `ROUTING_STYLE`, set them before running the build command. Keep the exact deployment values in the deployment repository or CI configuration so local development remains simple.
