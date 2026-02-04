<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'dark-mode',
  storage: localStorage,
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
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
}
</style>
