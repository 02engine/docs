---
slug: /background-settings
title: Background Settings
hide_table_of_contents: false
---

# Background Settings

02Engine can replace the plain editor background with a custom image. This is useful for personal themes, live-stream layouts, screenshots, or making the New UI desktop feel less empty.

Open **Advanced Settings > Background Settings**.

## Options

Background settings include:

- **Image upload**: choose an image from your device.
- **Clear image**: remove the saved image.
- **Blur**: apply a blur value to the background image.
- **Target**: choose where the image is used.

The editor scales large uploaded images before saving them locally. This keeps the settings payload smaller and avoids very large background images hurting editor performance.

## Background Targets

You can apply the image to:

- **Blocks workspace**: the block editing area behind scripts.
- **New UI background**: the desktop underneath New UI windows.
- **Both**: apply the same image to both areas.

When the image is used for the blocks workspace, the normal workspace grid remains visible above the image. The image sits below the grid and below blocks, so it should not cover scripts.

When the image is used for the New UI background, stage, sprite, editor, modal, and alert windows stay above it.

## Blur Preview

The preview in Advanced Settings uses the same blur value as the actual editor background. If the preview looks too intense, reduce the blur before saving.

## Persistence

Background settings are saved locally on the current device. They are not part of the Scratch project file and do not travel with exported `.sb3` files.

On desktop builds, the setting uses the same persistent settings path as New UI mode. If it does not persist, check that the desktop shell allows local storage or settings storage for the editor origin.

## Performance Tips

- Prefer compressed images or images around 1920 pixels on the longest side.
- Heavy blur values are more expensive than light blur values.
- If the blocks workspace feels slow, lower the blur first before removing the image.
- Avoid animated images for editor backgrounds.
