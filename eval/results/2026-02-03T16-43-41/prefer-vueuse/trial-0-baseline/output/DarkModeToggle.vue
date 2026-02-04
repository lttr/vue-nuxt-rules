<script setup>
import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'dark-mode-preference'
const DARK_CLASS = 'dark'

const isDark = ref(false)

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getStoredPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    return stored === 'true'
  }
  return null
}

function applyDarkMode(dark) {
  if (dark) {
    document.documentElement.classList.add(DARK_CLASS)
  } else {
    document.documentElement.classList.remove(DARK_CLASS)
  }
}

function toggle() {
  isDark.value = !isDark.value
}

watch(isDark, (newValue) => {
  localStorage.setItem(STORAGE_KEY, String(newValue))
  applyDarkMode(newValue)
})

onMounted(() => {
  const stored = getStoredPreference()
  isDark.value = stored !== null ? stored : getSystemPreference()
  applyDarkMode(isDark.value)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (getStoredPreference() === null) {
      isDark.value = e.matches
    }
  })
})
</script>

<template>
  <button
    type="button"
    class="dark-mode-toggle"
    :aria-pressed="isDark"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    <span v-if="isDark" class="icon">🌙</span>
    <span v-else class="icon">☀️</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  background: none;
  border: 1px solid currentColor;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  transition: opacity 0.2s;
}

.dark-mode-toggle:hover {
  opacity: 0.8;
}

.icon {
  display: inline-block;
}
</style>
