<template>
  <button
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    @click="toggle"
  >
    <slot :isDark="isDark">
      {{ isDark ? '☀️' : '🌙' }}
    </slot>
  </button>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'

const STORAGE_KEY = 'color-scheme'

function getInitialPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(false)

onMounted(() => {
  isDark.value = getInitialPreference()

  // Follow system changes only when user has no stored preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      isDark.value = e.matches
    }
  })
})

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}
</script>
