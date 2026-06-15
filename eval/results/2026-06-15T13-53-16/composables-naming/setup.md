# Setup

- **Model**: claude-opus-4-8
- **Rule file**: composables-naming.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 composable that tracks whether the user is online
or offline. Return the status.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS prefix names with `use` (e.g. `useMouse`). One composable per file, named `useFeatureName.ts`
````
