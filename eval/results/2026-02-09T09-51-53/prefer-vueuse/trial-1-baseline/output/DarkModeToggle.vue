<script setup>
import { useDarkMode } from './useDarkMode'

const { isDark, toggle } = useDarkMode()
</script>

<template>
  <button
    class="dark-mode-toggle"
    :aria-pressed="isDark"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    <span v-if="isDark">☀️ Light</span>
    <span v-else>🌙 Dark</span>
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
  font-size: 0.875rem;
}
</style>
