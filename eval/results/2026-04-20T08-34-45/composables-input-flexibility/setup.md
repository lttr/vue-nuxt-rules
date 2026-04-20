# Setup

- **Model**: claude-sonnet-4-6
- **Rule file**: composables-input-flexibility.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a reusable Vue 3 composable called useTitle that sets the
document title. It will be shared across multiple components.
Accept a title from the caller and update the document title
reactively when the input changes.
Write files to disk.
```

## Rule content

````markdown
- PREFER `toValue()` to accept refs, getters, or plain values as input in shared composables
````
