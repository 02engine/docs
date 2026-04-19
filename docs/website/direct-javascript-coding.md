---
slug: /direct-javascript-coding
title: Direct JavaScript Coding
hide_table_of_contents: false
---

# Direct JavaScript Coding

02Engine can compile a hat block from JavaScript written inside a comment. This is an advanced escape hatch for experiments, debugging, and high-control projects.

:::caution
Direct JavaScript code runs inside the compiled script body and can access VM internals. Only use code you understand and trust. Projects that depend on this feature are not Scratch-compatible.
:::

## Basic Usage

Add a comment to a top-level hat block and start a line with `#code`.

```js
#code
console.log('Hello from 02Engine');
target.setXY(100, 50);
retire();
return;
```

Everything after the `#code` line is used as the JavaScript body for that script. You can also write the first code line after the marker:

```js
#code console.log('single-line start');
retire();
return;
```

The marker must appear at the start of a line. Other comment lines before `#code` can still be used for normal notes or TurboWarp-style compiler flags.

## Available Variables

The generated script factory provides these variables:

| Name | Description |
| --- | --- |
| `target` | The target running the script. |
| `runtime` | The VM runtime. |
| `stage` | The stage target. |
| `thread` | The current thread. |
| `p0`, `p1`, ... | Custom block procedure arguments when compiling a procedure. |
| `block` | A helper for calling Scratch opcode functions. |
| `vars` | A helper for finding stage or target variables by name. |
| `wait` | A generator helper for millisecond delays. |

## Calling Blocks

`block` is a proxy that resolves opcode names through the runtime.

```js
block.looks_sayforsecs({
  MESSAGE: 'Hello',
  SECS: 1
});
```

For advanced cases, pass a block utility context manually:

```js
block.motion_gotoxy(
  {X: 0, Y: 0},
  {target}
);
```

## Accessing Variables and Lists

Use `vars.stage(name, type)` or `vars.target(name, type)`.

```js
const score = vars.stage('score');
score.value += 1;
score._monitorUpToDate = false;

const items = vars.target('items', 'list');
items.value.push('new item');
items._monitorUpToDate = false;
```

For normal variables, the second argument can be omitted. For lists, pass `'list'`.

## Yielding and Waiting

If the code contains `yield`, 02Engine compiles it as a generator script.

```js
#code
while (true) {
  target.setXY(target.x + 4, target.y);
  yield;
}
```

Use `yield* wait(ms)` for a delay:

```js
#code
block.looks_say({MESSAGE: 'Wait...'});
yield* wait(1000);
block.looks_say({MESSAGE: 'Done'});
retire();
return;
```

## Ending Scripts

For scripts that do not run forever, explicitly retire and return:

```js
retire();
return;
```

This mirrors the generated compiler cleanup path. If a script is a long-running generator loop, it can keep yielding instead.

## Compiler Interaction

Direct JavaScript only affects the script whose hat comment contains `#code`. Other scripts compile normally.

The implementation stores the code on the compiler intermediate script and uses it as the generated script body. Because this bypasses normal block compilation for that script, syntax errors or unsafe VM calls are surfaced as JavaScript/compiler errors instead of Scratch block errors.

## Practical Tips

- Keep code small and focused.
- Add `yield` in long loops so the editor does not freeze.
- Avoid relying on private VM fields unless you are prepared to update the project when internals change.
- Test in both editor and packaged runtime if you plan to distribute the project.
