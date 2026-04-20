<template>
  <button
    type="button"
    class="dark-mode-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    @click="toggle"
  >
    <span class="dark-mode-toggle__icon" aria-hidden="true">
      {{ isDark ? '🌙' : '☀️' }}
    </span>
    <span class="dark-mode-toggle__label">
      {{ isDark ? 'Dark' : 'Light' }}
    </span>
  </button>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const STORAGE_KEY = 'dark-mode'
const DARK_CLASS = 'dark'

const isDark = ref(false)
let mediaQuery = null

function applyClass(dark) {
  const root = document.documentElement
  if (dark) {
    root.classList.add(DARK_CLASS)
  } else {
    root.classList.remove(DARK_CLASS)
  }
}

function readStoredPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStoredPreference(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

function handleSystemChange(event) {
  if (readStoredPreference() === null) {
    isDark.value = event.matches
  }
}

function toggle() {
  isDark.value = !isDark.value
  writeStoredPreference(isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const stored = readStoredPreference()
  if (stored === 'dark') {
    isDark.value = true
  } else if (stored === 'light') {
    isDark.value = false
  } else {
    isDark.value =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange)
    }
  }
})

onBeforeUnmount(() => {
  if (!mediaQuery) return
  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener('change', handleSystemChange)
  } else if (mediaQuery.removeListener) {
    mediaQuery.removeListener(handleSystemChange)
  }
})

watch(isDark, applyClass, { immediate: true })
</script>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 9999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}

.dark-mode-toggle:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.dark-mode-toggle__icon {
  font-size: 1.1em;
  line-height: 1;
}
</style>
