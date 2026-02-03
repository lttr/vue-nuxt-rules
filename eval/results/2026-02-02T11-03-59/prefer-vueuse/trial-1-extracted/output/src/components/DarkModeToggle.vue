<script setup>
import { useColorMode } from '@vueuse/core'

const mode = useColorMode({
  storageKey: 'color-mode',
  attribute: 'class',
  selector: 'html',
  modes: {
    dark: 'dark',
    light: 'light',
  },
})

function toggle() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="dark-mode-toggle"
    :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`"
    @click="toggle"
  >
    <span v-if="mode === 'dark'">☀️</span>
    <span v-else>🌙</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  background: none;
  border: 1px solid currentColor;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  color: inherit;
}
</style>
