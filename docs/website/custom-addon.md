---
slug: /custom-addon
title: Custom Addon
hide_table_of_contents: false
---

# Custom Addon

02Engine keeps the TurboWarp-style addon system and adds local custom addon loading for development and power users.

## Install a Custom Addon

Open the addon menu and choose one of the custom import actions:

- **Choose folder**: install an addon from an unpacked folder.
- **Import Zip**: install an addon packaged as a zip file.

The addon should contain a valid addon manifest and the userscripts, styles, assets, or settings declared by that manifest.

## Where Addons Run

Addons run in the editor UI, not inside a Scratch project. They can add buttons, panels, context menu items, dropdown enhancements, editor search, debugging tools, visual themes, and other workflow features.

Examples included in the 02Engine GUI source include:

- `pause`
- `mouse-pos`
- `block-count`
- `find-bar`
- `variable-manager`
- `editor-searchable-dropdowns`
- `comment-vscode-sync`

## New UI Compatibility

New UI can remount or move editor DOM because the editor wrapper is inside windows. Addons should:

- Use the addon `tab.waitForElement` APIs instead of storing permanent DOM references.
- Avoid registering duplicate context menu or block menu callbacks.
- Re-check whether the active editor window changed before positioning floating UI.
- Treat the active Blockly workspace as the only writable workspace.

For more detail, see [Addon development notes](../development/addons.md).

## Trust and Safety

Custom addons are trusted editor code. Only install addons from sources you trust, especially when they interact with project files, local storage, remote URLs, or extension debugging tools.
