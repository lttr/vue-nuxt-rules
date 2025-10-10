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
PREFER VueUse composables and utility functions over custom implementations for common tasks like state management, DOM interactions, and browser APIs
```

## Eslint rule

No ESLint rule available

## Source

- https://vueuse.org/
- https://github.com/vueuse/vueuse
