<script setup>
import { useDark, useToggle } from '@vueuse/core'

// useDark handles all three requirements out of the box:
//  - persists the preference in localStorage (key: 'vueuse-color-scheme')
//  - falls back to the system color-scheme preference when nothing is stored
//  - toggles the configured class on the document element
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'color-scheme',
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    type="button"
    class="dark-mode-toggle"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleDark()"
  >
    <span aria-hidden="true">{{ isDark ? '🌙' : '☀️' }}</span>
    <span class="dark-mode-toggle__label">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}

.dark-mode-toggle:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
