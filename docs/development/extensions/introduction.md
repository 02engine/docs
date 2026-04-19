---
hide_table_of_contents: true
---

# Introduction to Custom Extensions

Custom extensions add new blocks to 02Engine using JavaScript.

This tutorial explains the extension API from the ground up. Read it in order if you are new to Scratch-style extensions; later pages assume the earlier examples make sense.

02Engine is optimized for trusted custom-extension workflows. The editor can import extensions from several galleries, batch import selected extensions, and connect to the 02Engine VSCode Toolbox debug server. The current 02Engine VM loads custom extension URLs through the unsandboxed extension runner, so only load extensions from sources you trust.

## Extension Types

When people say "extension", they may mean different systems:

| Type | Can access Scratch internals | Can be loaded by URL |
| --- | --- | --- |
| Core extensions, such as Pen and Translate | yes | no |
| Sandboxed custom extensions | no | yes |
| Unsandboxed custom extensions | yes | yes |

This tutorial focuses on custom extensions. Core extensions share concepts with custom extensions, but developing them usually means changing the VM and GUI repositories directly. See [Getting Started](../getting-started.md) for 02Engine repository development.

## Compatibility

Custom extensions are not compatible with the Scratch website. Projects made with custom extensions cannot be uploaded to scratch.mit.edu, but they can be opened in 02Engine and packaged with the [02Engine Packager](https://packager.02engine.org/).

## Prerequisites

You should be comfortable writing JavaScript before building extensions. Browser developer tools are also important for reading errors and inspecting runtime behavior.

Extensions can be developed with the website or desktop app.

## Ways To Develop

### File or Text Import

The custom extension loader can import local files or pasted JavaScript source. This is the simplest workflow and works with any editor.

### Local HTTP Server

A local HTTP server lets 02Engine reload your extension by URL:

```bash
cd path/to/your/extensions
python3 -m http.server 8080
```

Then load:

```text
http://localhost:8080/hello-world.js
```

### 02Engine VSCode Toolbox

For faster iteration, use the 02Engine VSCode Toolbox debug server and connect it from **Advanced Settings > 02Engine VScode Toolbox**. See [Extension Debugger](../../website/extension-debugger.md).

## Next Step

Next, make your first extension: [Hello World](./hello-world.md).
