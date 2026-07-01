# Setup

- **Model**: claude-sonnet-5
- **Effort**: low
- **Rule file**: destructure-props.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called UserCard.
It receives a user's name, email, and an optional avatar URL
(default to a placeholder). The component uses the name in both
the template and a greeting message in the script.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS destructure props directly from defineProps() to maintain reactivity and enable inline defaults; if no props are used in the script, call defineProps() without destructuring
````
