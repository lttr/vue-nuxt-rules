# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: scoped-styles.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called AlertBanner.
It shows a colored banner with a message and a dismiss button.
Style it for warning (yellow) and error (red) variants.

```

## Full rule content

````markdown
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

````

## Extracted rule content

````markdown
- ALWAYS use <style scoped> for component styles
````
