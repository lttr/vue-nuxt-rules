# Setup

- **Model**: claude-sonnet-4-6
- **Rule file**: no-mutating-props.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component that receives a `user` object prop with name and age.
Add a button that increments the user's age when clicked.
Write files to disk.
```

## Rule content

````markdown
- NEVER mutate props directly or nested properties; emit changes to parent instead
````
