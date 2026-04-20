# Setup

- **Model**: claude-opus-4-7
- **Rule file**: composables-vs-utils.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create code for a Vue 3 app that needs: a function to format
currency values (e.g. 1234.5 → "$1,234.50"), a function to
format dates, and a feature that tracks whether the browser
window is focused.
Write files to disk.
```

## Rule content

````markdown
PREFER plain utility functions over composables unless you need reactivity or lifecycle hooks. Expose state, let components handle presentation.
````
