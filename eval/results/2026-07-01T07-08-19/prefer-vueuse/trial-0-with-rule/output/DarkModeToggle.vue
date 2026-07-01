<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  storageKey: 'dark-mode',
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isDark"
    class="dark-mode-toggle"
    @click="toggleDark()"
  >
    {{ isDark ? '🌙 Dark' : '☀️ Light' }}
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  cursor: pointer;
}
</style>
