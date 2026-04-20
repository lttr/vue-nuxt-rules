<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const STORAGE_KEY = 'dark-mode'
const DARK_CLASS = 'dark'

const isDark = ref(false)
let mediaQuery = null

function applyClass(value) {
  document.documentElement.classList.toggle(DARK_CLASS, value)
}

function readStoredPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark') return true
  if (stored === 'light') return false
  return null
}

function handleSystemChange(event) {
  if (readStoredPreference() === null) {
    isDark.value = event.matches
  }
}

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

watch(isDark, applyClass, { immediate: false })

onMounted(() => {
  const stored = readStoredPreference()
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  isDark.value = stored !== null ? stored : mediaQuery.matches
  applyClass(isDark.value)
  mediaQuery.addEventListener('change', handleSystemChange)
})

onBeforeUnmount(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemChange)
  }
})
</script>

<template>
  <button
    type="button"
    class="dark-mode-toggle"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <span aria-hidden="true">{{ isDark ? '🌙' : '☀️' }}</span>
    <span class="label">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid currentColor;
  border-radius: 9999px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.dark-mode-toggle:hover {
  opacity: 0.85;
}

.label {
  font-size: 0.9rem;
}
</style>
