# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: script-setup-with-typescript.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called CountdownTimer.
It takes a target date and shows days, hours, minutes, seconds
remaining. Updates every second.

```

## Full rule content

````markdown
# Script setup with TypeScript

Script setup with TypeScript is the recommended approach in modern Vue development, as it combines the conciseness of script setup with advantages of using TypeScript.

## Rule for AI agents

```
- ALWAYS use `<script setup lang="ts">` for component's script section
```

## Eslint rule

- https://eslint.vuejs.org/rules/block-lang.html#script-lang-js
- https://eslint.vuejs.org/rules/component-api-style.html

## Source

- https://vuejs.org/guide/typescript/overview.html#using-vue-with-typescript

````

## Extracted rule content

````markdown
- ALWAYS use `<script setup lang="ts">` for component's script section
````
