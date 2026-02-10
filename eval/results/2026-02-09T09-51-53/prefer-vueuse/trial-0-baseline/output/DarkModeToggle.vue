<template>
  <button
    type="button"
    class="dark-mode-toggle"
    :aria-pressed="isDark"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    <span v-if="isDark" class="dark-mode-toggle__icon">🌙</span>
    <span v-else class="dark-mode-toggle__icon">☀️</span>
  </button>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = 'dark-mode-preference'
const CSS_CLASS = 'dark-mode'

const isDark = ref(false)
let mediaQuery = null

function getStoredPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) return null
  return stored === 'true'
}

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyClass(dark) {
  document.documentElement.classList.toggle(CSS_CLASS, dark)
}

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, String(isDark.value))
}

function onSystemChange(e) {
  // Only follow system preference when user hasn't set an explicit preference
  if (getStoredPreference() === null) {
    isDark.value = e.matches
  }
}

onMounted(() => {
  const stored = getStoredPreference()
  isDark.value = stored !== null ? stored : getSystemPreference()

  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', onSystemChange)
})

onUnmounted(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', onSystemChange)
  }
})

watchEffect(() => {
  applyClass(isDark.value)
})
</script>

<style scoped>
.dark-mode-toggle {
  background: none;
  border: 1px solid currentColor;
  border-radius: 6px;
  cursor: pointer;
  padding: 6px 10px;
  font-size: 1.2rem;
  line-height: 1;
  color: inherit;
}

.dark-mode-toggle:hover {
  opacity: 0.8;
}
</style>
