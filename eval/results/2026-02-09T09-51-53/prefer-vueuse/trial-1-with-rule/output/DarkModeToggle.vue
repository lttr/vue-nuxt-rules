<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'color-scheme',
  storage: localStorage,
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    type="button"
    class="dark-mode-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleDark()"
  >
    <span v-if="isDark" class="icon">&#9790;</span>
    <span v-else class="icon">&#9728;</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  background: none;
  border: 1px solid currentColor;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 1.25rem;
  color: inherit;
  line-height: 1;
}
</style>
