---
slug: /advanced-settings
hide_table_of_contents: false
sidebar_label: Overview
---

# Advanced Settings

Advanced Settings expose runtime, compiler, editor, and layout controls that normal Scratch does not provide. These settings are powerful; use them deliberately and test projects after changing them.

## Featured

- **Custom FPS** changes the target runtime framerate.
- **Custom OPF** changes operations per frame, which can increase script throughput.
- **Use Custom UI** enables the 02Engine New UI window layout.
- **Interpolation** visually smooths sprite motion between runtime steps.
- **High Quality Pen** improves pen rendering quality.
- **Skip Offscreen Sprite Rendering** skips safe fully offscreen sprite and clone draw calls during the normal stage render pass.
- **Warp Timer** prevents long warp scripts from locking the runtime forever, at a performance cost.

## Remove Limits

- **Infinite Clones** removes Scratch's 300-clone limit.
- **Remove Fencing** allows sprites to move farther offscreen and changes offscreen touching behavior.
- **Remove Miscellaneous Limits** removes selected sound effect and pen size limits.

## Danger Zone

- **Custom Stage Size** changes the project coordinate bounds away from 480 by 360.
- **Disable Compiler** forces scripts to run in the interpreter.
- **Store settings in project** saves selected runtime settings into the project so 02Engine can apply them when the project loads.
- **Reset Window Coefficients** resets New UI stage and sprite window layout data.

## 02Engine VScode Toolbox

This section connects the editor to the local extension debugging server. See [Extension Debugger](../extension-debugger.md).

## Background Settings

This section uploads and configures a local editor background image. See [Background Settings](../background-settings.md).

## Local Settings vs Project Settings

02Engine has two kinds of settings:

- **Local editor settings** live on the current device or desktop profile. New UI mode and editor backgrounds are examples.
- **Project-stored settings** are written into the project by **Store settings in project**. Runtime settings such as FPS, OPF, interpolation, high quality pen, offscreen sprite rendering, runtime limits, and stage size can be applied when the project is loaded by 02Engine.

Not every setting should be stored in a project. For example, settings that are mostly editor preferences or safety controls can remain local.

<!-- Migration for old links to https://docs.02engine.org/advanced-settings#high-quality-pen -->
import BrowserOnly from "@docusaurus/BrowserOnly";
import {Redirect} from "@docusaurus/router";

<BrowserOnly>{() => {
  if (location.hash === "#high-quality-pen") {
    return <Redirect to="high-quality-pen" />;
  }
  return <></>;
}}</BrowserOnly>
