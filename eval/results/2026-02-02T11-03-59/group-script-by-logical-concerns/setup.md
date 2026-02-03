# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: group-script-by-logical-concerns.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called ProductPage.
It has: a product title/description section, an image gallery
with thumbnail selection, an add-to-cart button with quantity
selector, and a reviews section that loads reviews from a URL.
The component should have at least 6 state variables and 3
derived values.

```

## Full rule content

````markdown
# Group script by logical concerns

When organizing code within Vue components, group related functionality together rather than grouping by type (e.g., all data properties, then all methods). This improves readability and makes it easier to understand the relationships between different parts of the code.

## Rule for AI agents

```
- PREFER to group by logical concerns rather than grouping by type (data, methods, computed) within components
```

## Eslint rule

- No ESLint rule available

## Source

- https://vuejs.org/guide/extras/composition-api-faq.html#more-flexible-code-organization

````

## Extracted rule content

````markdown
- PREFER to group by logical concerns rather than grouping by type (data, methods, computed) within components
````
