---
slug: /development/architecture
title: Architecture
hide_table_of_contents: false
---

# 02Engine Architecture

02Engine is built from Scratch and TurboWarp components with additional editor, VM, extension, and desktop behavior layered on top.

## Main Layers

```text
scratch-gui
  React editor shell
  New UI window manager
  extension library
  settings modal
  addons
  project load/save shell

scratch-vm
  targets, sprites, blocks, variables
  sequencer and threads
  compiler
  extension manager
  project serialization

scratch-blocks
  block rendering
  workspace
  toolbox and flyout
  block shapes and context menus

scratch-render
  stage WebGL renderer
  pen rendering
  drawable and touching behavior

scratch-paint
  costume editor
```

## GUI Responsibilities

The GUI owns editor presentation and user workflow:

- Old UI and New UI layout.
- Draggable stage, sprite, and editor windows.
- Menu bar collapse in New UI.
- Advanced settings and persistent editor preferences.
- Extension library source merging, filtering, favorites, and batch import.
- Addon loading and DOM discovery.
- Desktop-specific integrations exposed to the editor.

The GUI should not directly reimplement VM behavior. It should call VM APIs or dispatch Redux actions that eventually configure the VM.

## VM Responsibilities

The VM owns project execution:

- Runtime stepping and threads.
- Target selection through `editingTarget`.
- Block containers and workspace XML emission.
- Compiler options and runtime options.
- Extension registration and extension block refresh.
- Project serialization and deserialization.

02Engine-specific VM behavior currently includes direct JavaScript code extraction from comments, custom reporter support, unsandboxed extension loading by default in the extension manager, and helper APIs such as compiled source extraction.

## New UI Constraint

The most important New UI rule is that there is still only one active writable editor context.

The active editor window owns:

- `vm.editingTarget`
- the writable Blockly workspace
- the global editor tab
- addon hooks that expect one active workspace

Inactive editor windows should show snapshots or read-only state. They should not register extra writable Blockly listeners or duplicate addon hooks.

## Extension Loading

Extension library cards become one of three action types:

- Native extension ID.
- URL extension.
- Special action such as enabling custom reporters.

URL extensions are loaded through `vm.extensionManager.loadExtensionURL`. In the current 02Engine VM, the extension manager forces external extension URLs through the unsandboxed runner. This is convenient for advanced extensions but means extension sources must be trusted.

## Settings Flow

Settings usually flow like this:

1. A React setting component emits a change.
2. The settings container dispatches a Redux action.
3. The VM manager or connected container applies the changed option to the VM or renderer.
4. Some settings are saved locally, while **Store settings in project** writes selected runtime options into the project.

Examples:

- FPS maps to `vm.setFramerate`.
- OPF maps to `vm.setOpsPerFrame`.
- Runtime limits map to `vm.setRuntimeOptions`.
- Compiler settings map to `vm.setCompilerOptions`.
- Stage size maps to `vm.setStageSize`.

## Addon Runtime

Addons run in the GUI page and interact with DOM, Redux, VM, Blockly, and editor APIs. Because New UI can move or remount editor DOM, addon code should use the addon API's element discovery helpers and avoid one-time permanent DOM assumptions.
