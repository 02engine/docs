---
slug: /convert-cli
title: Convert SB3 to CLI
hide_table_of_contents: false
---

# Convert SB3 Files to a CLI App

The 02Engine Packager can export a Scratch project as a Node.js command line application. This is useful for automated tasks, server-side experiments, simulations, and tests that do not need a graphical stage.

## Export

1. Open [02Engine Packager](https://packager.02engine.org/).
2. Select your `.sb3` project.
3. Open **Environment**.
4. Choose **Other environments > Node.js CLI**.
5. Package and download the result.

## Why Use CLI Mode

CLI mode runs the project with scratch-vm in a Node.js environment.

Advantages:

- Smaller output than Electron-style desktop packaging.
- Faster startup because no browser window is created.
- Easier automation from scripts or CI.
- Direct console input/output.

Limitations:

- No graphical stage output.
- Mouse and keyboard interactions are limited or unavailable.
- Audio playback may be limited depending on the runtime environment.
- Some extensions expect browser APIs and may not work.

## Command Line Arguments

After packaging, run the app with arguments:

```bash
app.exe your-project.sb3 --mode test --count 5 --flag
```

CLI projects can read those arguments from JavaScript-enabled blocks or extension code through the CLI helper APIs exposed by the packaged runtime.

## CLI Helper API

The packaged CLI runtime can expose helper functions such as:

| API | Description |
| --- | --- |
| `cli.log(message)` | Print normal output. |
| `cli.error(message)` | Print error output. |
| `cli.warn(message)` | Print warning output. |
| `cli.info(message)` | Print informational output. |
| `cli.exit(code)` | Exit with a numeric status code. |
| `cli.getArgs()` | Return all parsed command line arguments. |
| `cli.getArg(key)` | Return one argument by key. |

Scratch `say` and `ask` behavior may also be mapped to console output/input in the packaged CLI environment.

## Example

```js
const args = cli.getArgs();
cli.log('Arguments:', args);

if (cli.getArg('mode') === 'test') {
  cli.log('Running in test mode');
}

cli.exit(0);
```

## Building The Downloaded Package

After downloading:

1. Extract the zip file.
2. Install Node.js 18 or newer.
3. Open a terminal in the extracted folder.
4. Install dependencies.
5. Build the executable.

The exact install/build commands depend on the packager template version. Follow the README included inside the generated package.
