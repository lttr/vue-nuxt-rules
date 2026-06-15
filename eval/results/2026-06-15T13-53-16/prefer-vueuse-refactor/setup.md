# Setup

- **Model**: claude-opus-4-8
- **Rule file**: prefer-vueuse.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Improve useLocalStorage.ts:
```ts
// useLocalStorage.ts
export function useLocalStorage(key: string, defaultValue: string) {
  const value = ref(localStorage.getItem(key) ?? defaultValue)
  watch(value, (v) => localStorage.setItem(key, v))
  return value
}
```
Write the improved version to useLocalStorage.ts.
Write files to disk.
```

## Rule content

````markdown
- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks
````
