<script setup>
import { ref } from 'vue'
import { formatCurrency, formatDate } from './utils/format.js'
import { useWindowFocus } from './composables/useWindowFocus.js'

const { focused } = useWindowFocus()

const amount = ref(1234.5)
const today = ref(new Date())
</script>

<template>
  <main class="app">
    <h1>Vue 3 Demo</h1>

    <section>
      <h2>Currency</h2>
      <p>{{ formatCurrency(amount) }}</p>
    </section>

    <section>
      <h2>Date</h2>
      <p>{{ formatDate(today, { dateStyle: 'full' }) }}</p>
    </section>

    <section>
      <h2>Window focus</h2>
      <p :class="{ focused, blurred: !focused }">
        The window is currently <strong>{{ focused ? 'focused' : 'not focused' }}</strong>.
      </p>
      <p class="hint">Click on another tab or window to see this change.</p>
    </section>
  </main>
</template>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  max-width: 32rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
section {
  margin-block: 1.5rem;
}
.focused {
  color: green;
}
.blurred {
  color: #b00;
}
.hint {
  color: #666;
  font-size: 0.875rem;
}
</style>
