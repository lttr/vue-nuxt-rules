# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: script-setup-with-typescript.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called CountdownTimer.
It takes a target date and shows days, hours, minutes, seconds
remaining. Updates every second.

```

## Rule content

````markdown
- ALWAYS use `<script setup lang="ts">` for component's script section
````
