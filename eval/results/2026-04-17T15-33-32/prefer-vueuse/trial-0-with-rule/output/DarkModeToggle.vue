<script setup lang="ts">
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
    {{ isDark ? '☀️ Light' : '🌙 Dark' }}
  </button>
</template>
