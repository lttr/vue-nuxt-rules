# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-organize-by-concern.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Improve useDashboard.ts:
```ts
// useDashboard.ts
export function useDashboard() {
  // All refs together
  const user = ref(null)
  const posts = ref([])
  const notifications = ref([])

  // All fetches together
  const fetchUser = async () => { /* ... */ }
  const fetchPosts = async () => { /* ... */ }
  const fetchNotifications = async () => { /* ... */ }

  return { user, posts, notifications, fetchUser, fetchPosts, fetchNotifications }
}
```
Write the improved version to useDashboard.ts.

```

## Rule content

````markdown
- PREFER grouping composable code by concern/feature, not by Vue API type (refs, computed, watchers)
````
