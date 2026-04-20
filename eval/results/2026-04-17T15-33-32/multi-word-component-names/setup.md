# Setup

- **Model**: claude-opus-4-7
- **Rule file**: multi-word-component-names.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component for displaying a user's profile card.
It shows avatar, name, bio, and social links. The component should
be reusable across the app.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS use multi-word component names except for Nuxt pages and layouts
````
