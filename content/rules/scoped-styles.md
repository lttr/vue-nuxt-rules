# Scoped Styles

Use `<style scoped>` by default for all component styles. Scoped styles apply only to elements of the current component, preventing style leakage and making components more maintainable.

## How it works

Vue adds unique data attributes to both CSS selectors and matching elements:

```vue
<!-- Input -->
<style scoped>
.button {
  color: red;
}
</style>

<!-- Output -->
<style>
.button[data-v-f3f3eg9] {
  color: red;
}
</style>
```

## Rule for AI agents

```
- ALWAYS use <style scoped> for component styles
```

## Source

- https://vuejs.org/api/sfc-css-features.html#scoped-css
