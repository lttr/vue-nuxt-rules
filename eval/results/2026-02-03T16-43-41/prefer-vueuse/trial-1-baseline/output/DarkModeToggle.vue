<script setup>
import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'dark-mode-preference'
const isDark = ref(false)

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function loadPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    return stored === 'true'
  }
  return getSystemPreference()
}

function applyDarkMode(dark) {
  document.documentElement.classList.toggle('dark', dark)
}

function toggle() {
  isDark.value = !isDark.value
}

watch(isDark, (newValue) => {
  localStorage.setItem(STORAGE_KEY, String(newValue))
  applyDarkMode(newValue)
})

onMounted(() => {
  isDark.value = loadPreference()
  applyDarkMode(isDark.value)

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      isDark.value = e.matches
    }
  })
})
</script>

<template>
  <button
    type="button"
    :aria-pressed="isDark"
    aria-label="Toggle dark mode"
    @click="toggle"
    class="dark-mode-toggle"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  background: none;
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
}
</style>
