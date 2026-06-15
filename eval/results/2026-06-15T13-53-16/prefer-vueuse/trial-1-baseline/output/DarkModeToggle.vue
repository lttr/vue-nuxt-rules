<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const STORAGE_KEY = 'dark-mode'
const DARK_CLASS = 'dark'

const isDark = ref(false)

// Whether the user has made an explicit choice (stored in localStorage).
// When false, we follow the system preference.
let hasStoredPreference = false

const media =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null

function applyClass(dark) {
  const root = document.documentElement
  root.classList.toggle(DARK_CLASS, dark)
}

function readStoredPreference() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark') return true
    if (stored === 'light') return false
  } catch (e) {
    // localStorage may be unavailable (private mode, disabled cookies).
  }
  return null
}

function handleSystemChange(event) {
  // Only follow the system when the user hasn't chosen explicitly.
  if (!hasStoredPreference) {
    isDark.value = event.matches
  }
}

function toggle() {
  isDark.value = !isDark.value
}

// Persist + apply whenever the value changes.
watch(isDark, (dark) => {
  applyClass(dark)
})

onMounted(() => {
  const stored = readStoredPreference()
  if (stored !== null) {
    hasStoredPreference = true
    isDark.value = stored
  } else {
    isDark.value = media ? media.matches : false
  }

  applyClass(isDark.value)

  if (media) {
    // addEventListener is the modern API; addListener is the legacy fallback.
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleSystemChange)
    } else if (typeof media.addListener === 'function') {
      media.addListener(handleSystemChange)
    }
  }
})

onBeforeUnmount(() => {
  if (media) {
    if (typeof media.removeEventListener === 'function') {
      media.removeEventListener('change', handleSystemChange)
    } else if (typeof media.removeListener === 'function') {
      media.removeListener(handleSystemChange)
    }
  }
})

function setPreference(dark) {
  hasStoredPreference = true
  isDark.value = dark
  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  } catch (e) {
    // Ignore write failures (storage unavailable / quota).
  }
}

function onToggle() {
  setPreference(!isDark.value)
}
</script>

<template>
  <button
    type="button"
    class="dark-mode-toggle"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="onToggle"
  >
    <span class="dark-mode-toggle__icon" aria-hidden="true">
      {{ isDark ? '🌙' : '☀️' }}
    </span>
    <span class="dark-mode-toggle__label">
      {{ isDark ? 'Dark' : 'Light' }}
    </span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid currentColor;
  border-radius: 9999px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
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
