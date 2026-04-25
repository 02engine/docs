---
slug: /packager/private-scratch-global
hide_table_of_contents: true
---

# Private Scratch global for unsandboxed extensions

:::info
This page is about the [02Engine Packager](https://packager.02engine.org/).
:::

02Engine Packager v3.1.0 adds an option called **Use a private Scratch global for unsandboxed extensions**.

This option is designed for packaged projects that use unsandboxed custom extensions and want to reduce how much of the host page stays exposed on `window`.

## Why this option exists

Normally, packaged projects that run unsandboxed extensions expose host objects such as:

- `window.Scratch`
- `window.vm`
- `window.scaffolding`

That makes extension compatibility simple, but it also means other scripts on the same page can more easily find and use those objects.

With the private Scratch global option enabled, the packaged project changes how unsandboxed extensions receive their APIs.

## What changes when enabled

When this option is turned on:

- unsandboxed extensions still receive `Scratch`
- `window.Scratch` still works inside the extension execution context
- extensions can still interact with page DOM APIs
- the host page no longer keeps `Scratch`, `vm`, and `scaffolding` permanently exposed on `window`

This means the option is focused on **reducing long-lived host-page exposure**, not on sandboxing the extension itself.

## What this helps with

This option can help reduce attack surface in cases where:

- other scripts on the page try to read `window.Scratch`
- users or tools inspect the page global scope directly
- a packaged project should avoid leaving high-privilege runtime objects permanently available on `window`

It is especially useful when you need unsandboxed extensions for compatibility, but still want a safer default host-page surface.

## What this does not do

This option does **not** turn unsandboxed extensions into sandboxed ones.

In particular:

- unsandboxed extensions still run with powerful access
- trusted extensions can still call Scratch APIs normally
- DOM access is still available to those extensions
- this is not a replacement for iframe sandboxing or strict isolation

So the main goal is to make it harder to directly grab runtime objects from the packaged page, while still preserving compatibility with existing unsandboxed extensions.

## Compatibility notes

02Engine's private Scratch global mode is designed to preserve the common unsandboxed extension patterns:

- `Scratch`
- `window.Scratch`
- `globalThis.Scratch`
- browser APIs such as `performance.now()`, `btoa()`, and DOM access

Because the option preserves the normal unsandboxed execution model as much as possible, it is intended to work with existing extensions without requiring source changes.

If a project depends on unusual extension behavior, test the packaged output and compare it with the normal mode.

## Recommended usage

Use this option when:

- your project depends on unsandboxed extensions
- you want to keep extension compatibility
- you do not want packaged pages to permanently expose Scratch internals on the host `window`

If your project does not use custom unsandboxed extensions, this option usually does not matter.
