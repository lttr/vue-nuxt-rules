<script setup>
import { useDark, useToggle } from '@vueuse/core'

// useDark handles all three requirements out of the box:
//  - persists the preference in localStorage (storageKey)
//  - falls back to the system `prefers-color-scheme` when no stored value exists
//  - toggles a class on the document root element (selector + valueDark/valueLight)
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
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleDark()"
  >
    <span aria-hidden="true">{{ isDark ? '🌙' : '☀️' }}</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 50%;
  color: inherit;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.dark-mode-toggle:hover {
  background: rgba(127, 127, 127, 0.15);
}

.dark-mode-toggle:active {
  transform: scale(0.92);
}

.dark-mode-toggle:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
