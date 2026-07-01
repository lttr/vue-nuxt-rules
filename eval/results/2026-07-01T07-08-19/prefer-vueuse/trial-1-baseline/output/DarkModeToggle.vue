<template>
  <button
    type="button"
    class="dark-mode-toggle"
    role="switch"
    :aria-checked="isDark"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    {{ isDark ? '🌙' : '☀️' }}
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

function handleSystemChange(e) {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) {
    isDark.value = e.matches
  }
}

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  media = window.matchMedia('(prefers-color-scheme: dark)')

  if (stored === 'dark') {
    isDark.value = true
  } else if (stored === 'light') {
    isDark.value = false
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
  background: none;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 999px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
}
</style>
