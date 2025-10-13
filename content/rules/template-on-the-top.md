# Template on the top

In Vue Single File Components (SFCs), the `<template>` section should always be placed at the top of the file, before `<script>` and `<style>` sections. This convention improves readability by presenting the component's rendered output first, making it easier to understand what the component renders before diving into its logic and styling.

The template contains the structure of the component. By placing the `<template>` on the top an HTML first principle is promoted.

## Rule for AI agents

```
- ALWAYS place the <template> section at the top of Vue SFC files, before <script> and <style> sections
```

## Eslint rule

- https://eslint.vuejs.org/rules/component-tags-order.html

## Source

- https://vuejs.org/style-guide/rules-recommended.html#single-file-component-top-level-element-order
