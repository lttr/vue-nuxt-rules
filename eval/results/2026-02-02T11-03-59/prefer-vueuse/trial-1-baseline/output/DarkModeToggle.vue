<template>
  <button
    type="button"
    class="dark-mode-toggle"
    :aria-pressed="isDark"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
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
  // Only follow system changes if the user hasn't set a manual preference
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
  background: none;
  border: 1px solid currentColor;
  border-radius: 6px;
  padding: 0.4em 0.6em;
  font-size: 1.2rem;
  cursor: pointer;
  color: inherit;
  line-height: 1;
}
</style>
