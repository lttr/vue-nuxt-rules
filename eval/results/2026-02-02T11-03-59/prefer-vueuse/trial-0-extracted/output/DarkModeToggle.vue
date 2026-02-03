<script setup>
import { useColorMode } from '@vueuse/core'
import { computed } from 'vue'

const mode = useColorMode({
  storageKey: 'color-mode',
  emitAuto: true,
})

const isDark = computed(() => mode.value === 'dark')

function toggle() {
  mode.value = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isDark"
    aria-label="Toggle dark mode"
    class="dark-mode-toggle"
    @click="toggle"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  background: none;
  border: 1px solid currentColor;
  border-radius: 6px;
  padding: 0.4em 0.6em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;
}
</style>
