---
slug: /editor-windows
title: Editor Windows
hide_table_of_contents: false
---

# Editor Windows

In New UI, 02Engine can place the normal editor wrapper inside movable editor windows. The goal is to keep the original Scratch editing experience intact while allowing multiple targets to stay visible in a windowed workspace.

## What an Editor Window Contains

The active editor window contains the original `gui_editor-wrapper`:

- Code tab and block toolbox
- Costumes tab
- Sounds tab
- Addon UI that attaches to the editor tabs or workspace
- Extension, backpack, search, variable, and debugging integrations that depend on the active editor context

Inactive editor windows keep a visual snapshot of their last active layout where possible. This avoids remounting multiple writable Blockly editors at once, which would conflict with the VM's single active `editingTarget` model.

## Active Window Model

Only one editor window is active at a time. The active window controls:

- `vm.editingTarget`
- The global editor tab state
- The writable Blockly workspace
- Addon hooks that expect one active editor
- Keyboard shortcuts and context menus

When you click an inactive editor window, it becomes active and 02Engine synchronizes the VM editing target and editor tab to that window.

## Locking a Window

The lock button on an editor window keeps that window bound to its current target.

When the active editor window is **unlocked**, selecting another sprite or the stage reuses the current editor window.

When the active editor window is **locked**, selecting another target opens or activates a different editor window instead. This lets you keep one target visible while editing another.

## Closing and Fullscreen

Editor windows include a close button and a window fullscreen button. Closing an active editor window activates another available editor window when possible. If no editor window remains, selecting a target creates one again.

Window fullscreen is an editor layout feature, not the same as Scratch stage fullscreen.

## Known Design Constraint

The VM and scratch-blocks architecture are built around one writable workspace. 02Engine therefore keeps exactly one writable editor active and uses snapshots for inactive windows. This is intentional: it preserves addon compatibility, avoids duplicate Blockly injection, and prevents two editor windows from writing conflicting block events into the same target model.

## Troubleshooting

If an editor window appears too small, clipped, or misplaced:

- Click the window once to activate it and force the editor wrapper to resize.
- Use the resize handle to trigger a fresh layout.
- Use **Advanced Settings > Reset Window Coefficients** if the stage or sprite windows are out of place.
- Disable New UI temporarily if you need the classic single-editor layout for comparison.
