<script setup>
import { ref, onMounted, watch } from 'vue'

const STORAGE_KEY = 'dark-mode'
const DARK_CLASS = 'dark'

// null = follow the system; true/false = explicit user choice persisted in localStorage
const isDark = ref(false)

let media = null

function applyClass(dark) {
  document.documentElement.classList.toggle(DARK_CLASS, dark)
}

function getStoredPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark') return true
  if (stored === 'light') return false
  return null
}

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function handleSystemChange(event) {
  // Only follow the system while the user has no explicit stored preference.
  if (getStoredPreference() === null) {
    isDark.value = event.matches
  }
}

onMounted(() => {
  const stored = getStoredPreference()
  isDark.value = stored === null ? getSystemPreference() : stored

  media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', handleSystemChange)
})

watch(isDark, (dark) => {
  applyClass(dark)
}, { immediate: true })

function toggle() {
  isDark.value = !isDark.value
  // Persist the explicit choice so it overrides the system preference.
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <button
    type="button"
    class="dark-mode-toggle"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <span aria-hidden="true">{{ isDark ? '🌙' : '☀️' }}</span>
    <span class="dark-mode-toggle__label">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 0.9em;
  font: inherit;
  cursor: pointer;
  border: 1px solid currentColor;
  border-radius: 999px;
  background: transparent;
  color: inherit;
}

.dark-mode-toggle:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.dark-mode-toggle__label {
  font-size: 0.9em;
}
</style>
