<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

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
    :aria-pressed="isDark"
    aria-label="Toggle dark mode"
    @click="toggleDark()"
  >
    <span aria-hidden="true">{{ isDark ? '🌙' : '☀️' }}</span>
    <span class="dark-mode-toggle__label">
      {{ isDark ? 'Dark' : 'Light' }} mode
    </span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 0.375rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}

.dark-mode-toggle:hover {
  opacity: 0.85;
}
</style>
