<template>
  <button
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    class="dark-mode-toggle"
    @click="toggle"
  >
    <slot :isDark="isDark">
      {{ isDark ? '☀️' : '🌙' }}
    </slot>
  </button>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'

const STORAGE_KEY = 'dark-mode'

function getInitialValue() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'true'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(false)

onMounted(() => {
  isDark.value = getInitialValue()

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      isDark.value = e.matches
    }
  })
})

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem(STORAGE_KEY, String(isDark.value))
})

function toggle() {
  isDark.value = !isDark.value
}
</script>

<style scoped>
.dark-mode-toggle {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0.25rem;
  font-size: 1.25rem;
  line-height: 1;
}
</style>
