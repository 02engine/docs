---
slug: /canvas-renderer
title: Canvas Blocks Renderer
hide_table_of_contents: false
---

# Canvas Blocks Renderer

02Engine can draw the main blocks workspace with Canvas instead of creating a
large SVG tree for every visible block. The option is enabled by default and
works in both the original UI and the New UI.

Open **Advanced Settings > 02Engine Settings** and use **Use Canvas renderer
for the blocks workspace** to change the mode. The setting is stored as a
local editor preference. It is not written into the `.sb3` project.

## Why It Exists

Large projects can contain many blocks, fields, icons, and nested inputs. A
native SVG workspace can become expensive when the browser has to maintain and
style a large number of SVG nodes, even when most of the scripts are outside
the visible area.

Canvas mode keeps the block model in Blockly but paints visible block geometry
on one Canvas surface. This reduces the amount of browser DOM and SVG layout
work needed while preserving the normal Scratch editing model.

The setting is most useful when:

- a project has many scripts or very long stacks;
- the editor is frequently panned or zoomed;
- SVG layout and DOM updates are the main source of editor slowdown.

It may provide little benefit when a project has only a few small scripts or
when the bottleneck is the VM, extensions, audio, or stage rendering.

## What Canvas Mode Changes

Canvas mode changes the rendering surface of the main editor workspace. It
does not replace Blockly's project model.

Blockly still owns:

- block objects and their parent, next, input, and shadow connections;
- toolbox and flyout behavior;
- field values, menus, editing, context menus, and gestures;
- undo and redo events;
- project serialization and VM synchronization;
- block geometry needed for connection matching.

The main workspace is painted by the Canvas renderer. The toolbox/flyout stays
on the native Blockly path so that dragging a new block from the palette keeps
the expected toolbox behavior. Lightweight model nodes provide the SVG-like
handles that Blockly and addons need for compatibility, but they are not added
to the browser's SVG DOM tree for normal workspace blocks.

## Visibility and Loading

Canvas mode calculates the complete block graph but materializes detailed paint
geometry only for blocks inside the visible workspace area, with a small
prefetch margin. Blocks outside that area keep inexpensive estimated geometry
so that positions, bounds, and connections remain meaningful without painting
every block.

Workspace loading and layout work is split across animation frames. This keeps
the browser responsive while a large target is being prepared. Panning causes
new visible geometry to be scheduled; it does not require the whole project to
be redrawn as SVG.

When a block is actively dragged, the renderer temporarily computes the full
layout of the dragged top-level stack. This is intentional: Blockly's
insertion manager needs exact positions for every available connection in that
stack, including connections that are currently outside the viewport. Other
scripts continue to use viewport-based rendering.

## Interaction Compatibility

Canvas mode routes hit testing back into Blockly's normal gesture system. The
following operations are intended to behave like native SVG mode:

- selecting and dragging blocks;
- unplugging a block from an existing input or stack and inserting it directly
  into another connection;
- snapping compatible connections;
- editing text fields and opening dropdown menus;
- opening block context menus;
- dragging blocks from the toolbox;
- using addon-provided block shapes, fields, labels, and icons.

The renderer keeps connection coordinates synchronized after graph changes. In
particular, a block pulled out of a parent keeps its absolute workspace
position before the graph is changed, and the dragged stack is measured again
after the unplug operation. This prevents the first snap candidate from using
stale child-relative coordinates.

## Theme and Addons

Canvas painting reads the active block theme and refreshes when the editor
theme changes. Addons should use the normal Blockly and 02Engine addon APIs
instead of assuming that a workspace block has a real SVG DOM node.

Addon compatibility handles remain available for code that reads common
Blockly properties such as block roots, fields, icons, and bounding boxes. An
addon that directly queries SVG paths, inserts DOM children into individual
workspace blocks, or depends on SVG-only CSS may still need an update. See
[Addon Compatibility](../../development/addons.md) for New UI and remount-safe
addon patterns.

## Switching Back to SVG

Turn **Use Canvas renderer for the blocks workspace** off to use Blockly's
native SVG renderer. Changing the option recreates the blocks workspace using
the selected renderer so that SVG and Canvas state are not mixed.

Use SVG mode when diagnosing an addon that depends on real SVG nodes or when
you need to compare a rendering issue against the upstream Blockly behavior.
Switching modes does not change the project data or block IDs.

:::caution
Canvas mode is an editor rendering option, not a project optimization. It does
not change how scripts execute and does not remove blocks from the project.
Always test projects that rely on SVG-specific addon behavior with the renderer
mode you intend to use.
:::
