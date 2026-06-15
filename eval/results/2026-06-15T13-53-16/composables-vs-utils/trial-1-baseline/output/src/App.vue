<script setup>
import { formatCurrency } from './utils/formatCurrency'
import { formatDate } from './utils/formatDate'
import { useWindowFocus } from './composables/useWindowFocus'

const { focused } = useWindowFocus()

const price = 1234.5
const today = new Date()
</script>

<template>
  <main class="app">
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Currency</h2>
      <p>{{ price }} → <strong>{{ formatCurrency(price) }}</strong></p>
    </section>

    <section>
      <h2>Date</h2>
      <p><strong>{{ formatDate(today) }}</strong></p>
    </section>

    <section>
      <h2>Window focus</h2>
      <p>
        The window is currently
        <strong :class="focused ? 'focused' : 'blurred'">
          {{ focused ? 'focused' : 'not focused' }}
        </strong>.
      </p>
      <p class="hint">Switch to another tab or window to see it change.</p>
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
.focused {
  color: green;
}
.blurred {
  color: crimson;
}
.hint {
  color: #666;
  font-size: 0.875rem;
}
</style>
