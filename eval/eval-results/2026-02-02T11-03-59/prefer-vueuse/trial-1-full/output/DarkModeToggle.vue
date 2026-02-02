<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core'

const mode = useColorMode({
  storageKey: 'dark-mode-preference',
  attribute: 'class',
  selector: 'html',
  modes: {
    auto: 'auto',
    light: 'light',
    dark: 'dark',
  },
})

const { state, next } = useCycleList(['auto', 'light', 'dark'] as const, {
  initialValue: mode,
})

function toggle() {
  next()
  mode.value = state.value
}

const labels: Record<string, string> = {
  auto: 'System',
  light: 'Light',
  dark: 'Dark',
}
</script>

<template>
  <button
    class="dark-mode-toggle"
    :aria-label="`Color mode: ${labels[mode]}. Click to change.`"
    @click="toggle"
  >
    <span v-if="mode === 'dark'" class="icon">&#9790;</span>
    <span v-else-if="mode === 'light'" class="icon">&#9728;</span>
    <span v-else class="icon">&#9881;</span>
    {{ labels[mode] }}
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid currentColor;
  border-radius: 0.375rem;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.icon {
  font-size: 1.2em;
}
</style>
