# Setup

- **Model**: claude-sonnet-5
- **Effort**: low
- **Rule file**: composables-organize-by-concern.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 composable called useUserDashboard that manages:
user profile data with loading state, notification preferences
with a save method, and activity log with pagination.
It should have at least 6 state variables and 3 methods.
Write files to disk.
```

## Rule content

````markdown
- PREFER grouping composable code by concern/feature, not by Vue API type (refs, computed, watchers)
````
