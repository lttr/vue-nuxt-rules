# Setup

- **Model**: claude-opus-4-7
- **Rule file**: script-setup-with-typescript.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called CountdownTimer.
It takes a target date and shows days, hours, minutes, seconds
remaining. Updates every second.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS use `<script setup lang="ts">` for component's script section
````
