# Use "of" instead of "in" for v-for

Vue allows both `v-for="item in items"` and `v-for="item of items"` syntax. Prefer using `of` as the delimiter because it aligns with JavaScript's native `for...of` loop syntax (`for (const item of items)`).

## Rule for AI agents

```
- ALWAYS use v-for="item of items" instead of v-for="item in items" to match JavaScript for...of syntax
```

## Eslint rule

- https://eslint.vuejs.org/rules/v-for-delimiter-style.html#of

## Source

- https://vuejs.org/guide/essentials/list.html#v-for
