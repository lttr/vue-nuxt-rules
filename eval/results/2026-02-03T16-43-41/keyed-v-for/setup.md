# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: keyed-v-for.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called UserList.
It receives an array of users (each with id, name, email) and
renders them as a list of cards. Each card shows name and email.

```

## Rule content

````markdown
- ALWAYS use key in v-for loops
````
