---
slug: /development/scratchx
hide_table_of_contents: true
---

# ScratchX & 02Engine

02Engine has primitive support for using ScratchX extensions and loading ScratchX projects (.sbx). ScratchX was a modified version of Scratch 2 created by the Scratch Team that allowed using unofficial extensions. ScratchX no longer functions due to Flash being removed from all major browsers, and the website was finally shut down in early 2023.

ScratchX extensions run in the extension sandbox. Any functionality related to hardware will not work. Many extensions also rely on web services that are increasingly broken due to the age of the extensions.

To use a ScratchX extension in 02Engine, find the URL to the extension's JavaScript source code and load it as you would any other [custom extension](/development/custom-extensions).
