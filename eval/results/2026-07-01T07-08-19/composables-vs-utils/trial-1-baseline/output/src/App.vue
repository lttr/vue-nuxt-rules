<script setup>
import { formatCurrency } from './utils/formatCurrency'
import { formatDate } from './utils/formatDate'
import { useWindowFocus } from './composables/useWindowFocus'

const { isFocused } = useWindowFocus()
</script>

<template>
  <div class="app">
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Currency Formatting</h2>
      <p>{{ formatCurrency(1234.5) }}</p>
      <p>{{ formatCurrency(0) }}</p>
      <p>{{ formatCurrency(99.999) }}</p>
    </section>

    <section>
      <h2>Date Formatting</h2>
      <p>{{ formatDate(new Date()) }}</p>
      <p>{{ formatDate('2026-07-01', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
    </section>

    <section>
      <h2>Window Focus</h2>
      <p>Window is currently: <strong>{{ isFocused ? 'Focused' : 'Blurred' }}</strong></p>
    </section>
  </div>
</template>

<style scoped>
.app {
  font-family: sans-serif;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}
section {
  margin-bottom: 1.5rem;
}
</style>
