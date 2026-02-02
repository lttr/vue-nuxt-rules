# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: keyed-v-for.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called UserList.
It receives an array of users (each with id, name, email) and
renders them as a list of cards. Each card shows name and email.

```

## Full rule content

````markdown
# Keyed `v-for`

`key` with `v-for` is always required on components, in order to maintain internal component state down the subtree.

## Rule for AI agents

```
- ALWAYS use key in v-for loops
```

## Eslint rule

- https://eslint.vuejs.org/rules/require-v-for-key.html

## Source

- https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for

````

## Extracted rule content

````markdown
- ALWAYS use key in v-for loops
````
