<template>
  <button
    type="button"
    class="dark-mode-toggle"
    role="switch"
    :aria-checked="isDark"
    @click="toggle"
  >
    {{ isDark ? '🌙 Dark' : '☀️ Light' }}
  </button>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'

const STORAGE_KEY = 'dark-mode-preference'
const DARK_CLASS = 'dark'

const isDark = ref(false)
let media

function applyClass(value) {
  document.documentElement.classList.toggle(DARK_CLASS, value)
}

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

function handleSystemChange(event) {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) {
    isDark.value = event.matches
  }
}

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  media = window.matchMedia('(prefers-color-scheme: dark)')

  if (stored === 'dark' || stored === 'light') {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = media.matches
  }

  media.addEventListener('change', handleSystemChange)
})

onBeforeUnmount(() => {
  media?.removeEventListener('change', handleSystemChange)
})

watchEffect(() => {
  applyClass(isDark.value)
})
</script>

<style scoped>
.dark-mode-toggle {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border-color, #ccc);
  background: var(--bg-color, #fff);
  color: var(--text-color, #222);
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.dark-mode-toggle:hover {
  opacity: 0.85;
}
</style>
