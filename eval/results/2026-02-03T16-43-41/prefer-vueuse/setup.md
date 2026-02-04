# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: prefer-vueuse.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called DarkModeToggle.
It persists the user's dark mode preference in localStorage,
detects the user's system color scheme preference, and applies
a CSS class to the document.

```

## Rule content

````markdown
- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks
````
