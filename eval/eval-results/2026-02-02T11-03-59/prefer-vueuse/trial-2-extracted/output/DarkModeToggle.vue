<template>
  <button
    class="dark-mode-toggle"
    :aria-label="`Switch to ${nextLabel} mode`"
    @click="toggleDark()"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
    {{ isDark ? 'Dark' : 'Light' }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode, useCycleList } from '@vueuse/core'

const { store, state } = useColorMode({
  selector: 'html',
  attribute: 'class',
  modes: {
    dark: 'dark',
    light: 'light',
  },
  storageKey: 'color-mode',
  initialValue: 'auto',
})

const isDark = computed(() => state.value === 'dark')

const { next: toggleDark } = useCycleList(['light', 'dark', 'auto'] as const, {
  initialValue: store,
})

const nextLabel = computed(() => {
  if (store.value === 'light') return 'dark'
  if (store.value === 'dark') return 'system'
  return 'light'
})
</script>

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
  font-size: 0.875rem;
  cursor: pointer;
}
</style>
