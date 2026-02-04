# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-setup-context.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component that uses a composable for tracking
mouse position and another composable for managing a list of items.
Show both in the template.

```

## Rule content

````markdown
- ALWAYS call composables in `<script setup>` or `setup()` only — never in callbacks, utils, or async contexts
````
