# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-organize-by-concern.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 composable called useUserDashboard that manages:
user profile data with loading state, notification preferences
with a save method, and activity log with pagination.
It should have at least 6 state variables and 3 methods.

```

## Full rule content

````markdown
# Organize composable code by logical concern

Within composables, group related code together by feature/concern rather than by Vue API type. Don't cluster all refs in one place, all computed in another, and all watchers elsewhere.

Grouping by concern keeps related logic together, making it easier to understand, maintain, and extract into smaller composables when needed.

### Internal ordering

Within each concern group, follow this order: state → metadata (loading, error) → methods → return statement. This creates a consistent reading flow across all composables.

Example:

```typescript
// Good - grouped by concern
function useUserProfile(userId: Ref<string>) {
  // User data concern
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const fetchUser = async () => { /* ... */ }

  // Avatar concern
  const avatarUrl = computed(() => user.value?.avatar ?? defaultAvatar)
  const updateAvatar = async (file: File) => { /* ... */ }

  return { user, isLoading, avatarUrl, fetchUser, updateAvatar }
}

// Bad - grouped by API type
function useUserProfile(userId: Ref<string>) {
  // All refs together
  const user = ref(null)
  const isLoading = ref(false)

  // All computed together
  const avatarUrl = computed(() => /* ... */)

  // All functions together
  const fetchUser = async () => { /* ... */ }
  const updateAvatar = async () => { /* ... */ }
}
```

## Rule for AI agents

```
- PREFER organizing code within composables as: state → metadata → methods → return
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/extras/composition-api-faq.html#more-flexible-code-organization

````

## Extracted rule content

````markdown
- PREFER organizing code within composables as: state → metadata → methods → return
````
