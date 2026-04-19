---
slug: /offscreen-drawable-culling
hide_table_of_contents: false
---

# Skip Offscreen Sprite Rendering

Skip Offscreen Sprite Rendering is an optional 02Engine renderer optimization. When enabled, the renderer skips drawing sprites and clones that are fully outside the stage during the normal stage render pass.

This can improve performance in projects that keep many visible sprites or clones outside the stage area. For example, a project with thousands of offscreen enemies, particles, bullets, or cached objects may spend a lot of time submitting draw calls for things the player cannot see. This setting avoids that work when it is safe to do so.

## When it helps

This setting is most useful when:

- Many sprites or clones are visible but fully outside the stage bounds.
- The project uses large numbers of bitmap or SVG costumes.
- Rendering is a bottleneck, especially with many offscreen clones.
- The offscreen objects are only waiting to enter the visible stage later.

It usually will not help much when:

- Most sprites are already on the stage.
- The project is limited by scripts, collisions, audio, or extension code instead of rendering.
- The project mainly uses pen drawing rather than many sprite drawables.

## What is still rendered normally

The optimization is deliberately conservative. It only affects the normal stage render pass. Other renderer queries keep their original behavior, including:

- touching blocks
- color picking
- sprite picking
- stamping
- screenshots
- renderer extraction and other special draw passes

02Engine also avoids culling drawables that use effects which can change their visual shape, such as effects that make bounds harder to predict safely.

## Project compatibility

This setting should not change Scratch logic. Offscreen sprites still exist, scripts still run, variables still update, and collision queries still use the original renderer behavior.

The visible difference should only be that fully offscreen bitmap/SVG sprites are not submitted to WebGL until they move back into the stage area.

:::tip
If a project creates thousands of visible clones outside the stage, this option can make the stage renderer do dramatically less work. If the project keeps all clones onscreen, the improvement may be close to zero.
:::

:::caution
Because this changes the renderer's draw submission path, test visually complex projects after enabling it. If a project relies on unusual renderer behavior or special effects, compare the result with the option disabled.
:::

## Saving in projects

Skip Offscreen Sprite Rendering is a runtime option. If **Store settings in project** is enabled, 02Engine saves this option into the project's settings comment along with other project-stored advanced settings.

When the project is opened again in 02Engine, the saved option is applied automatically.

## Measuring the effect

For a clear benchmark, create many visible clones and place them fully outside the stage:

```scratch
when green flag clicked
hide
repeat 5000
  create clone of myself
end

when I start as a clone
show
go to x: 1000 y: pick random -180 to 180
forever
  change x by 0
end
```

Then compare performance with the setting disabled and enabled. The improvement should be most visible when many eligible drawables are offscreen.

For debugging, the renderer exposes the last draw statistics:

```js
vm.runtime.renderer.getLastDrawStats()
```

`culledDrawables` shows how many drawables were skipped in the last normal render pass.
