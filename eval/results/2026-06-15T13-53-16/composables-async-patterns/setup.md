# Setup

- **Model**: claude-opus-4-8
- **Rule file**: composables-async-patterns.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 composable that fetches data from a given API URL.
It should provide the fetched data to the component, and the
component needs to show a loading spinner while fetching and an
error message if the request fails.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS expose `loading`/`error` refs from async composables; use `watchEffect` for reactive data fetching
````
