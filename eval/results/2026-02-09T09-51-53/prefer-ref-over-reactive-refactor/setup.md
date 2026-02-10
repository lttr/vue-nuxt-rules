# Setup

- **Model**: claude-opus-4-6
- **Rule file**: prefer-ref-over-reactive.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Improve TodoList.vue:
```vue
<!-- TodoList.vue -->
<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({ items: [], loading: false, error: null })
// ... rest of component using state.items, state.loading
</script>
```
Write the improved version to TodoList.vue.
Write files to disk.
```

## Rule content

````markdown
- PREFER `ref()` over `reactive()` for state
````
