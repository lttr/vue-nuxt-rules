<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
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
    <span v-if="isDark">☀️ Light</span>
    <span v-else>🌙 Dark</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  cursor: pointer;
  border: 1px solid currentColor;
  border-radius: 6px;
  padding: 0.4em 0.8em;
  font-size: inherit;
  color: inherit;
  background: transparent;
}
</style>
