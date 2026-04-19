---
slug: /new-ui
title: New UI
hide_table_of_contents: false
---

# New UI

The 02Engine New UI replaces the fixed Scratch editor layout with a desktop-like workspace. The stage, sprite pane, and editor area become independent windows that can be arranged around the screen.

Old UI remains available and keeps the classic Scratch-style layout. New UI only changes the editor shell; projects still run on the same VM and save in the same project format.

## Enable or Disable New UI

Open **Advanced Settings** and toggle **Use Custom UI**.

In the current 02Engine GUI this setting is saved locally, so the editor can reopen in the same UI mode next time. Project-specific runtime settings are handled separately by **Store settings in project**.

## Window Types

New UI uses three main window groups:

- **Stage window**: contains the project stage and stage header controls.
- **Sprite window**: contains the target list and sprite controls.
- **Editor windows**: contain the regular `gui_editor-wrapper` editor area for the active target.

These windows share the same desktop area, but modal dialogs, extension library dialogs, settings dialogs, alerts, and loading screens are layered above them.

## Menu Bar Collapse

New UI adds a compact collapse button on the menu bar. When collapsed, the workspace desktop extends upward and only the reopen button remains visible. This is designed for small screens and for editing projects with large workspaces.

This menu bar collapse control is only shown in New UI. Old UI keeps the normal menu bar behavior.

## Stage Auto Size

The stage window can use an automatic stage size mode. In that mode, the visible stage adapts to the stage window size instead of staying locked to the classic fixed editor proportions. The project coordinate system is still controlled by the VM stage size setting; auto size only changes the editor presentation.

If the New UI window fullscreen mode is enabled, the classic stage fullscreen button is hidden to prevent two fullscreen systems from fighting each other.

## Resetting Layout

If windows get moved offscreen or a layout becomes uncomfortable, open **Advanced Settings** and use **Reset Window Coefficients**. This resets the stage and sprite window position and size values stored by the editor.

Editor windows are session-based. They are recreated when needed and are not intended to persist across every browser refresh or project load.

## Addon Compatibility

02Engine includes extra handling so addons can rediscover remounted DOM without being injected repeatedly. Addons that add menu bar buttons, block counts, pause controls, searchable dropdowns, or variable tools should attach to the active editor window and avoid assuming there is only one static editor DOM tree.

For addon authors, see [New UI addon compatibility](../development/addons.md).
