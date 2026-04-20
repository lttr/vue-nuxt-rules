# Setup

- **Model**: claude-opus-4-7
- **Rule file**: same-name-prop-shorthand.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called UserProfile that uses a child
component called AvatarImage. Pass variables named userName,
avatarUrl, and isOnline to AvatarImage as props with the same
names.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS use same-name shorthand `:propName` instead of `:propName="propName"`
````
