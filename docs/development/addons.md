---
slug: /development/addons
title: Addon Compatibility
hide_table_of_contents: false
---

# Addon Compatibility

02Engine inherits the TurboWarp addon system and extends the editor with New UI windows. Addons should support both layouts.

## Old UI vs New UI

Old UI has one mostly static editor layout. New UI can place the editor wrapper inside movable windows and can collapse the menu bar. The active editor may change when the user clicks another editor window or selects another target.

Do not assume:

- The editor wrapper is always mounted at startup.
- The menu bar has a fixed position.
- The Blockly workspace element never moves.
- There is only one visual editor-window DOM subtree.
- A one-time DOM query will stay valid forever.

## Active Editor Rule

Only the active editor window has the writable Blockly workspace. Addon code that changes blocks, reads the selected workspace, opens block context menus, or positions overlays over the workspace should target the active workspace only.

Inactive editor windows may display snapshots. Addons should not inject controls into those snapshots.

## DOM Discovery

Use addon API helpers such as `tab.waitForElement` and rerun-safe observers instead of storing permanent DOM references.

If your addon adds UI, make the insertion idempotent:

- Check whether your element already exists before inserting it.
- Use a stable class or data attribute.
- Remove or update stale elements when the active editor changes.
- Avoid pushing duplicate context menu callbacks.

## Menu and Context Menu Addons

Menu-style addons are especially sensitive to repeated userscript execution. Register menu items once per addon/action pair. If your addon can be rerun, keep a module-level or DOM-level guard.

Good pattern:

```js
if (!document.querySelector('[data-my-addon-button]')) {
  const button = document.createElement('button');
  button.dataset.myAddonButton = 'true';
  // insert button
}
```

Avoid:

```js
// Adds another button every time the editor remounts.
menu.appendChild(document.createElement('button'));
```

## Floating Panels

For floating panels such as variable managers, debuggers, or search UI:

- Anchor to the active editor or active workspace.
- Recalculate position after window drag, resize, tab switch, and theme change.
- Hide or detach when the active editor no longer contains the expected target.
- Keep z-index below modals and above editor content.

## Theme Changes

New UI can keep inactive editor snapshots. Addons that render persistent UI should listen for theme/style changes and update their own DOM instead of waiting for a full page refresh.

## Testing Checklist

Test your addon in:

- Old UI.
- New UI with one editor window.
- New UI with two editor windows, one locked.
- After switching Code, Costumes, Sounds, and addon-provided tabs.
- After switching light/dark theme.
- After selecting a different sprite.
- After opening and closing extension library and settings modals.
- After reloading or enabling an extension.
