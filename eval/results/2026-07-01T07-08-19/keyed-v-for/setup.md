# Setup

- **Model**: claude-sonnet-5
- **Effort**: low
- **Rule file**: keyed-v-for.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called UserList.
It receives an array of users (each with id, name, email) and
renders them as a list of cards. Each card shows name and email.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS use key in v-for loops
````
