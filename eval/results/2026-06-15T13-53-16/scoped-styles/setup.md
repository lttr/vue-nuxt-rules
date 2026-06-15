# Setup

- **Model**: claude-opus-4-8
- **Rule file**: scoped-styles.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called AlertBanner.
It shows a colored banner with a message and a dismiss button.
Style it for warning (yellow) and error (red) variants.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS use <style scoped> for component styles
````
