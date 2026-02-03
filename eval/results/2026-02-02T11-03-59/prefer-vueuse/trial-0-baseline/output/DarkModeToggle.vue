<template>
  <button
    type="button"
    class="dark-mode-toggle"
    :aria-pressed="isDark"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    <span v-if="isDark">☀️ Light</span>
    <span v-else>🌙 Dark</span>
  </button>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = 'dark-mode-preference'
const CSS_CLASS = 'dark-mode'

const isDark = ref(false)

let mediaQuery = null

function applyDarkMode(dark) {
  if (dark) {
    document.documentElement.classList.add(CSS_CLASS)
  } else {
    document.documentElement.classList.remove(CSS_CLASS)
  }
}

function getStoredPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) return null
  return stored === 'true'
}

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function handleSystemChange(e) {
  // Only follow system preference if user hasn't set an explicit preference
  if (getStoredPreference() === null) {
    isDark.value = e.matches
  }
}

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, String(isDark.value))
}

watch(isDark, (dark) => {
  applyDarkMode(dark)
})

onMounted(() => {
  const stored = getStoredPreference()
  isDark.value = stored !== null ? stored : getSystemPreference()
  applyDarkMode(isDark.value)

  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleSystemChange)
})

onUnmounted(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemChange)
  }
})
</script>

<style scoped>
.dark-mode-toggle {
  padding: 0.5rem 1rem;
  border: 1px solid currentColor;
  border-radius: 0.375rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
}
</style>
