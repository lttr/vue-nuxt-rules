# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: prefer-vueuse.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called DarkModeToggle.
It persists the user's dark mode preference in localStorage,
detects the user's system color scheme preference, and applies
a CSS class to the document.

```

## Full rule content

````markdown
# Prefer VueUse

VueUse is a collection of essential Vue Composition utilities that provides production-ready, well-tested composables and utility functions for common tasks. Instead of writing custom composables, prefer using VueUse when applicable.

Benefits:

- **Automatic cleanup**: Side-effects are cleaned up on component unmount
- **Reactive by default**: Works seamlessly with Vue's reactivity system
- **SSR-friendly**: Handles server-side rendering safely
- **TypeScript support**: Full type definitions included
- **Tree-shakeable**: Only import what you need

Common composables and utilities include `useLocalStorage`, `onClickOutside`, `useMouse`, `useClipboard`, and `useBreakpoints`.

## Rule for AI agents

```
- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks
```

## Eslint rule

No ESLint rule available

## Source

- https://vueuse.org/
- https://github.com/vueuse/vueuse

````

## Extracted rule content

````markdown
- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks
````
