<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core'

const mode = useColorMode({
  storageKey: 'color-mode',
  attribute: 'class',
  selector: 'html',
  modes: {
    light: 'light',
    dark: 'dark',
  },
})

const { state, next } = useCycleList(['dark', 'light', 'auto'] as const, {
  initialValue: mode,
})

function toggle() {
  next()
  mode.value = state.value
}
</script>

<template>
  <button
    class="dark-mode-toggle"
    :aria-label="`Color mode: ${state}. Click to change.`"
    @click="toggle"
  >
    <span v-if="state === 'dark'">🌙 Dark</span>
    <span v-else-if="state === 'light'">☀️ Light</span>
    <span v-else>💻 System</span>
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
