---
slug: /opf
title: Operations Per Frame
hide_table_of_contents: false
---

# Operations Per Frame

Operations Per Frame, or OPF, controls how much Scratch VM work can run during one visual frame. In 02Engine it is exposed as **Custom OPF** in Advanced Settings.

## What It Changes

Scratch-like runtimes step scripts repeatedly, then draw a frame. Increasing OPF lets scripts run more work before the next draw. This can improve projects that rely on heavy logic, simulations, or server-like loops, but it can also make the editor less responsive.

## When To Use It

Use higher OPF when:

- A project is CPU-heavy but does not need every intermediate visual frame.
- You are running calculations, data processing, or CLI-style packaged projects.
- Turbo mode is enabled and you want scripts to advance faster.

Keep OPF low when:

- You need smooth animation.
- You are editing a large project and the GUI becomes less responsive.
- The project uses many visual effects, pen drawing, or stage interactions every frame.

## Relationship To FPS

FPS controls how often the runtime tries to produce frames. OPF controls how much work happens in each frame. Raising both at the same time can create high CPU usage quickly.

For most projects, tune FPS first, then increase OPF only if the project still needs more script throughput.
