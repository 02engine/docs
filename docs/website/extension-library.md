---
slug: /extension-library
title: Extension Library
hide_table_of_contents: false
---

# Extension Library

02Engine's extension library is a multi-source extension workbench. It keeps Scratch's original extensions, then adds external galleries and 02Engine-only actions in one searchable interface.

## Sources

The source sidebar groups extensions by where their metadata comes from:

- **Official Scratch**: built-in Scratch extensions such as Pen, Music, Translate, and hardware extensions.
- **02Engine**: extensions listed from the 02Engine extension gallery.
- **TurboWarp**: extensions from the TurboWarp extension gallery.
- **PenguinMod**: extensions exposed through the PenguinMod metadata module.
- **Mist**: Mist extension metadata.
- **SharkPool**: SharkPool extension metadata.
- **Other**: loaded items that do not match the named source groups.

The default order follows the original extension list and gallery order. It is not alphabetically resorted, so curated order from each source is preserved.

## Search and Filters

The top area supports combined filtering:

- Search by name, description, tags, source name, and author/credit text.
- Filter to favorites.
- Filter to currently selected batch items.
- Filter to Scratch-compatible extensions.
- Filter to native built-in extensions.
- Filter to custom extension entries.

Filters can be combined. If the result is empty, clear filters or switch sources.

## Favorites

Favorite state is stored by extension URL when available, otherwise by extension ID. This allows duplicate entries in favorite sections and source sections to share the same favorite state.

## Single Import

Clicking a card still uses the normal single-extension behavior:

- Built-in/native extensions load directly.
- URL-based extensions open the import method dialog when appropriate.
- The **Custom Extension** card opens the custom extension loader.
- The **Custom Reporters** item enables custom procedure return support.

Native extensions do not support text import. When a native extension is selected, 02Engine loads it through the normal VM extension path.

## Batch Import

Cards that can be queued show a checkbox in the card corner. Select one or more items and click **Batch import X extensions**.

Batch import behavior:

- Extensions are processed one by one.
- A failure does not stop the rest of the queue.
- URL extensions can use normal import or text import.
- Native extensions always use normal import, even if text import is selected.
- Special actions such as custom reporter enablement run through their own action path.
- A completion summary reports how many extensions succeeded or failed.

The **Custom Extension** loader card is intentionally not batch-selectable because it opens a separate manual loader flow.

## Compatibility Badges

Cards may show badges such as:

- **Native**: a built-in extension loaded by ID.
- **Batch**: can be added to a batch import queue.
- **Not Scratch-compatible**: the extension or feature creates projects that the Scratch website may not support.

Scratch compatibility means "safe to expect in Scratch-like environments." It does not mean the extension is guaranteed to upload or run on scratch.mit.edu.

## External Gallery Trust

02Engine's VM currently loads custom extension URLs through the unsandboxed extension runner. Only install extensions from sources you trust. Unsandboxed extensions can access powerful browser and VM APIs that normal Scratch projects cannot.
