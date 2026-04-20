<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const STORAGE_KEY = 'dark-mode'
const DARK_CLASS = 'dark'

const isDark = ref(false)
let mediaQuery = null

function apply(dark) {
  document.documentElement.classList.toggle(DARK_CLASS, dark)
}

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

function handleSystemChange(event) {
  if (localStorage.getItem(STORAGE_KEY) === null) {
    isDark.value = event.matches
  }
}

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  if (stored === 'dark' || stored === 'light') {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = mediaQuery.matches
  }

  mediaQuery.addEventListener('change', handleSystemChange)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', handleSystemChange)
})

watch(isDark, apply, { immediate: true })
</script>

<template>
  <button
    type="button"
    class="dark-mode-toggle"
    :aria-pressed="isDark"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    <span aria-hidden="true">{{ isDark ? '☀️' : '🌙' }}</span>
    <span class="label">{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
  </button>
</template>

<style scoped>
.dark-mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}

.dark-mode-toggle:hover {
  opacity: 0.85;
}
</style>
