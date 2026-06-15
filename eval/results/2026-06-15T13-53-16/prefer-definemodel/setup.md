# Setup

- **Model**: claude-opus-4-8
- **Rule file**: prefer-definemodel.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called RatingInput.
It shows 5 star buttons. The parent component needs to read
and control the selected rating value (1-5).
Write files to disk.
```

## Rule content

````markdown
- USE `defineModel()` for two-way binding instead of manual prop+emit pairs
````
