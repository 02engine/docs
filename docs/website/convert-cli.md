---
slug: /convert-cli
title: Convert Sb3 files to executable CLI
hide_table_of_contents: false
---

# Convert Sb3 files to executable CLI
1.https://packager.02engine.org/

2.select your project

3.`Environment->Other environments->Node.js CLI`

Node.js CLI runs your Scratch project directly in Node.js environment using scratch-vm. This is intended for server-side execution, automated testing, or batch processing tasks.

Advantages:

- Small file size (~20-30MB vs ~100MB for Electron)
- Fast startup (no browser overhead)
- Direct event monitoring
Command Line Arguments:

You can pass arguments to your application like this:

`app.exe your-project.sb3 --arg1 value1 --arg2 value2 --flag`

CLI API Available:

In CLI mode, you can use the following JavaScript functions in your Scratch project:

- You can use a `say` block to output text to the console

- cli.log(message) - Output text to console
- cli.error(message) - Output error to console
- cli.warn(message) - Output warning to console
- cli.info(message) - Output info to console
- cli.exit(code) - Exit the application (0 = success, non-zero = error)
- cli.getArgs() - Get all command line arguments as an object
- cli.getArg(key) - Get a specific command line argument by key
Example Usage:
```javascript
// Get command line arguments
const args = cli.getArgs();
cli.log('Arguments:', args);

// Get specific argument
const mode = cli.getArg('mode');
if (mode === 'test') {
  cli.log('Running in test mode');
}

// Exit with success code
cli.exit(0);
Packaging Instructions:
```
After downloading the package:

Extract the ZIP file to a folder

Install Node.js (version 18 or higher)

Open a terminal/command prompt in the extracted folder

Run `npm install` to install dependencies

Run `npm run build` to create the executable

The executable will be created in the same folder

Simply run the executable - no external SB3 file needed!

Important: Node.js CLI mode:

No graphical output - project runs in headless mode

Mouse and keyboard interactions will not work

Audio playback may be limited

Some extensions may not be compatible

Perfect for automated testing, server-side execution, or background tasks