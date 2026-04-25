---
slug: /packager/
hide_table_of_contents: true
---

# 02Engine Packager

:::info
Use the 02Engine Packager here: https://packager.02engine.org/
:::

The 02Engine Packager converts Scratch projects into HTML files, zip archives, or executable programs for Windows, macOS, Android and Linux. It's like HTMLifier and the forkphorus packager.

This is the place where some extra documentation goes. Use the sidebar on the left to navigate.

Notable 02Engine-specific options include:

- [Precompile scripts into package](./precompile-scripts.md): compile scripts during packaging, keep runtime data, strip normal block source from the packaged output, and optionally obfuscate the precompiled JavaScript with adjustable strength.
- [Private Scratch global for unsandboxed extensions](./private-scratch-global.md): keep unsandboxed extension compatibility while avoiding a permanently exposed `window.Scratch`, `window.vm`, and `window.scaffolding` on the packaged host page.
