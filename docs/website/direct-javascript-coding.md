# 02Engine JavaScript Direct Coding Feature

## Overview

02Engine extends the Scratch GUI by allowing developers to write JavaScript code directly inside comments on **hat blocks**, bypassing the traditional block-to-JavaScript compilation process.  
When the compiler detects a `#code` comment, it directly uses the JavaScript code inside the comment as the executable script body.

## Features

- **Direct JavaScript Execution**: Write JS code in comments and compile/run it directly  
- **Full Runtime Access**: Access the complete internal Scratch VM API  
- **Generator Function Support**: Use the `yield` keyword to pause execution between frames  
- **Parameter Passing**: Access parameters of custom procedures  
- **Backward Compatibility**: Fully compatible with existing Scratch projects  

## Usage

### 1. Adding a Comment

Add a comment to a hat block (such as “when green flag clicked”) using the following format:

```js
#code
// Your JavaScript code
console.log("Hello from JS!");
target.setXY(100, 50);
```

Or in a single line:

```js
#code console.log("Single-line code");
```

You can directly use the `block` function to call Scratch blocks, for example:

```js
block.looks_sayforsecs({ MESSAGE: "Hello", SECS: 2 }, { target: target });
```

You can quickly access variables using the `vars.stage` / `vars.target` helpers:

```js
// Access a list
list = vars.stage("My List", "list"); // global list
list.value.push(123);
list._monitorUpToDate = false; // refresh display

// Access variables
variable = vars.stage("My Variable"); // global variable
selfvar = vars.target("Private Variable"); // local variable
variable.value++;
variable._monitorUpToDate = false;
```

You can use `yield* wait` to implement delays:

```js
yield* wait(1000); // milliseconds
```

Each script must end with:

```js
retire();
return;
```

### 2. Comment Rules

- `#code` must occupy an entire line or appear at the beginning of a line  
- All lines following `#code` are treated as JavaScript code  
- Multi-line JavaScript is supported  
- Other comment content is allowed, but only the `#code` section is parsed  

### 3. Writing Code

Available predefined variables:

| Name | Type | Description |
|-----|------|-------------|
| `target` | `RenderedTarget` | Sprite executing the script |
| `runtime` | `Runtime` | Scratch runtime instance |
| `stage` | `RenderedTarget` | Stage object |
| `thread` | `Thread` | Current execution thread |
| `p0`, `p1`, ... | `any` | Procedure parameters |

## Technical Implementation

### Modified Files

#### 1. `intermediate.js`

```js
/**
 * Custom JavaScript code for this script, if any.
 * @type {string|null}
 */
this.customCode = null;
```

#### 2. `irgen.js`

Core logic:
- Detect lines starting with `#code`
- Collect subsequent lines as JavaScript
- Auto-detect `yield`
- Store code in `this.script.customCode`

#### 3. `jsgen.js`

```js
if (this.script.customCode) {
  source = this.script.customCode;
}
```

### Compilation Flow

1. Parse hat block comments
2. Use `customCode` directly if present
3. Execute inside the Scratch runtime

## Example Code

### Example 1: Simple Movement

```js
let x = 100;
let y = 100;
let dx = 5;
let dy = 3;

while (true) {
  x += dx;
  y += dy;

  if (x > 240 || x < -240) dx = -dx;
  if (y > 180 || y < -180) dy = -dy;

  target.setXY(x, y);
  yield;
}
```

### Example 2: Mouse Following

```js
while (true) {
  const mouse = runtime.ioDevices.mouse;
  target.setXY(mouse._clientX - 240, 180 - mouse._clientY);
  yield;
}
```

### Example 3: Loop Output

```js
target.setXY(0, 0);
for (let i = 0; i < 10; i++) {
  block.looks_sayforsecs({ MESSAGE: i, SECS: 0.5 });
  yield* wait(500);
}
retire(); return;
```

## Notes

### Security
- JavaScript executes directly; only trust safe code
- Beware of injection risks

### Performance
- Always use `yield` in long loops
- Avoid heavy per-frame allocations

### Compatibility
- APIs depend on Scratch VM internals
- Test across versions and browsers

## License

This feature is based on the Scratch open-source project and follows its license.  
Please ensure compliance with Scratch’s terms of use.