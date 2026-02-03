# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: multi-word-component-names.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component for displaying a user's profile card.
It shows avatar, name, bio, and social links. The component should
be reusable across the app.

```

## Full rule content

````markdown
# Multi-word component names

This rule require component names to be always multi-word, except for root App components, and built-in components provided by Vue, such as `<transition>` or `<component>`. This prevents conflicts with existing and future HTML elements, since all HTML elements are single words.

For Nuxt, there has to be some exceptions:

- `app.vue`
- `error.vue`
- `pages/*.vue`
- `layouts/*.vue`

## Rule for AI agents

```
- ALWAYS use multi-word component names except for Nuxt pages and layouts
```

## Eslint rule

- https://eslint.vuejs.org/rules/multi-word-component-names.html#related-rules

## Source

- https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names

````

## Extracted rule content

````markdown
- ALWAYS use multi-word component names except for Nuxt pages and layouts
````
