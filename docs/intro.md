---
slug: /
hide_table_of_contents: true
---

# 02Engine Documentation

02Engine is a Scratch-compatible editor, runtime, desktop app, and packager built from the Scratch and TurboWarp codebases. It keeps the familiar Scratch project model while adding tools for larger projects, extension-heavy workflows, direct JavaScript experiments, and a window-based editor layout.

This documentation is written for 02Engine specifically. Some compatibility pages still describe upstream Scratch or TurboWarp behavior because 02Engine inherits those systems, but the main editor and development pages focus on what is unique in 02Engine.

## Start Here

- [New UI](./website/new-ui.md): use the window-based editor with separate stage, sprite, and editor windows.
- [Editor windows](./website/editor-windows.md): understand multi-window editing, locking, snapshots, and layout reset.
- [Extension library](./website/extension-library.md): install built-in, 02Engine, TurboWarp, PenguinMod, Mist, SharkPool, and custom extensions.
- [Background settings](./website/background-settings.md): set image backgrounds for the block workspace and New UI desktop.
- [Custom reporters](./website/return.md): enable custom blocks that return values.
- [Direct JavaScript coding](./website/direct-javascript-coding.md): run JavaScript from `#code` comments on hat blocks.
- [Extension debugger](./website/extension-debugger.md): connect the editor to the 02Engine VSCode Toolbox server.
- [Packager precompile mode](./packager/precompile-scripts.md): package projects with precompiled scripts and stripped block source.
- [Development guide](./development/getting-started.md): build the 02Engine repositories using Bun.

## What Makes 02Engine Different

02Engine is aimed at creators who quickly outgrow the default Scratch editor. The main differences are:

- A New UI mode where the stage, sprite pane, and editor can be moved, resized, minimized, and arranged independently.
- Multi-editor-window support in New UI so you can keep an editor window locked while opening another target.
- A redesigned extension library with source navigation, quick filters, favorites, batch selection, and batch import.
- Unsandboxed custom extension loading by default in the VM extension manager, intended for trusted extension workflows.
- Advanced project settings for FPS, operations per frame, interpolation, pen quality, clone limits, fencing, miscellaneous limits, custom stage size, compiler behavior, and project-stored settings.
- Editor background customization with saved image, blur, and target controls.
- A WebSocket-based extension debugging bridge for the 02Engine VSCode Toolbox.
- VM/compiler additions including custom reporters and direct JavaScript script bodies from comments.

## Repositories

- [02Engine editor](https://02engine.org/)
- [02Engine GitHub organization](https://github.com/02engine)
- [02Engine Packager](https://packager.02engine.org/)

## Compatibility Notes

02Engine tries to stay compatible with Scratch projects wherever practical, but some features intentionally create projects that cannot be uploaded to the Scratch website. This includes custom extensions, custom reporters, direct JavaScript code, removed limits, and some advanced runtime settings. When a page describes a feature with compatibility risks, it will call that out directly.
