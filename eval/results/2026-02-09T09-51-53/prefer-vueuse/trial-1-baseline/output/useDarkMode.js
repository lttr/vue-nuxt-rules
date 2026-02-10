import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'dark-mode-preference'

const isDark = ref(false)

function applyClass(dark) {
  document.documentElement.classList.toggle('dark', dark)
}

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function loadPreference() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    return stored === 'true'
  }
  return getSystemPreference()
}

let initialized = false

export function useDarkMode() {
  if (!initialized) {
    initialized = true
    isDark.value = loadPreference()
    applyClass(isDark.value)

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (localStorage.getItem(STORAGE_KEY) === null) {
          isDark.value = e.matches
        }
      })

    watch(isDark, (val) => {
      applyClass(val)
      localStorage.setItem(STORAGE_KEY, String(val))
    })
  }

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
