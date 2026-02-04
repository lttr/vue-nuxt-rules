# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: same-name-prop-shorthand.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called UserProfile that uses a child
component called AvatarImage. Pass variables named userName,
avatarUrl, and isOnline to AvatarImage as props with the same
names.

```

## Rule content

````markdown
- ALWAYS use same-name shorthand `:propName` instead of `:propName="propName"`
````
