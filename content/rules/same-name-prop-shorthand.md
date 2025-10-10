# Same name prop shorthand

When a prop has the same name as the variable being passed, Vue allows using shorthand syntax. Instead of writing `:propName="propName"`, you can simply write `:propName`. This makes templates more concise and reduces redundancy while maintaining clarity.

This shorthand is similar to ES6 object property shorthand and is supported in Vue's template syntax.

## Rule for AI agents

```
ALWAYS use shorthand syntax (`:propName`) when passing a prop with the same name as the variable, instead of the verbose form (`:propName="propName"`)
```

## Eslint rule

- https://eslint.vuejs.org/rules/v-bind-style.html#samenameshorthand-always

## Source

- https://vuejs.org/guide/essentials/template-syntax.html#same-name-shorthand
