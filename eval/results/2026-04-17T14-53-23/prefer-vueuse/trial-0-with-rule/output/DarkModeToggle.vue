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
    {{ isDark ? '🌙 Dark' : '☀️ Light' }}
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  padding: 0.5rem 1rem;
  border: 1px solid currentColor;
  border-radius: 0.375rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}
</style>
