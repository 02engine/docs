---
slug: /packager/precompile-scripts
hide_table_of_contents: true
---

# Precompile scripts into package

:::info
This page is about the [02Engine Packager](https://packager.02engine.org/).
:::

The experimental **Precompile scripts into package** option changes how 02Engine packages project code.

Normally, a packaged project still contains the original Scratch block data. When the packaged project starts, the VM loads `project.json`, restores every target's blocks, and compiles those scripts at runtime.

With **Precompile scripts into package** enabled, packaging does extra work ahead of time:

- The packager loads the project into a temporary VM during packaging.
- Each target's scripts and procedures are compiled before export.
- The compiled output is saved into a separate compiled-project bundle.
- The packaged `project.zip` keeps targets, assets, variables, monitors, fonts, and project configuration, but removes normal block source data.

In other words, the final package keeps the runtime data needed to run the project, but does not keep the original block graph as editable source.

## Optional: obfuscate precompiled JavaScript

When **Precompile scripts into package** is enabled, 02Engine can also enable:

- **Obfuscate precompiled JavaScript**

This option only affects the precompiled script factories stored in the compiled-project bundle. It does not change costumes, sounds, or the normal asset files.

When enabled, the packager runs an additional JavaScript obfuscation step on the precompiled script code before export. This makes the generated runtime script factories harder to read and recover compared to plain precompiled output.

### Obfuscation strength

02Engine provides three obfuscation strength levels:

- **Light**: lowest packaging overhead and lowest runtime impact
- **Balanced**: recommended default for most projects
- **Strong**: heavier obfuscation, but may increase packaging time and reduce runtime performance in some projects

If your packaged project becomes noticeably slower after enabling obfuscation, switch from **Strong** to **Balanced** or **Light** first.

### Progress feedback during packaging

When obfuscation is enabled, the packager will show an extra progress stage while it processes compiled scripts.

The progress display shows:

- current processed script count
- total script count
- current obfuscation strength

This helps confirm that packaging is still running normally, especially on large projects where obfuscation may take a while.

## What changes in the output

When this option is enabled, packaged zip-style outputs include:

- `project.zip`
- `compiled-project.json`

The `project.zip` still contains `project.json`, costumes, sounds, and other assets, but `targets[].blocks` are stripped. The `compiled-project.json` file contains the compiled script factories that the runtime executes.

Single-file HTML output works the same way internally. Instead of loading only the original project data, the page embeds:

- a stripped project archive
- the compiled project bundle

At runtime the page uses `loadCompiledProject(...)` instead of the normal `loadProject(...)` path.

If JavaScript obfuscation is also enabled, the compiled script factories inside `compiled-project.json` are further transformed before export.

## What stays in the package

The option removes block source, not the entire project structure. Packaged projects still keep:

- costumes and sounds
- variables, lists, broadcasts, and monitors
- extension URLs and extension storage data
- custom fonts
- stored project options such as custom stage size and runtime settings

02Engine keeps the special `_twconfig_` project configuration comment so settings like stage size, fencing, clone limits, framerate, and similar saved options continue to load correctly.

## What gets removed

The usual exported project data no longer keeps:

- normal block source in `targets[].blocks`
- ordinary editor comments

This means packaged output is harder to recover back into the original Scratch-style editing source.

## Why use it

This option can be useful when you want:

- faster startup for code-heavy projects
- less runtime compilation work during project load
- packaged output that does not contain original block source

Projects with very large scripts usually benefit the most.

## How to tell that it worked

You can inspect a packaged output and look for these signs:

- The package contains `compiled-project.json`
- `index.html` uses `loadCompiledProject(...)`
- `project.zip` contains `project.json`, but `targets[].blocks` are empty
- `compiled-project.json` contains compiled target entries with script or procedure factory source

If JavaScript obfuscation is enabled, you can also expect:

- the compiled script factory source to be much less readable than plain precompiled output
- `compiled-project.json` to include obfuscation metadata

If those are present, the package is using the precompiled runtime path instead of the normal source-block path.

## Limitations

This feature is still marked experimental because it changes the normal loading path and depends on the current VM/compiler implementation.

You should test packaged output carefully if your project:

- uses many custom extensions
- depends on unusual runtime settings
- depends on edge-case project metadata
- must match non-precompiled builds exactly

For obfuscated precompiled packages, you should also test carefully if your project:

- is very large
- is performance-sensitive
- already runs close to the browser's performance limits

If a project behaves differently, turn the option off and compare the normal package to the precompiled package first.
