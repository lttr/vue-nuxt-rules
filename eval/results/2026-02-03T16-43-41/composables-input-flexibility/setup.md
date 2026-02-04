# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-input-flexibility.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 composable called useTitle that sets the document
title. It should accept the title from the caller, which might
pass a static string, a reactive value, or a function. Update
the document title when the input changes.

```

## Rule content

````markdown
- PREFER `toValue()` to accept refs, getters, or plain values as input
````
