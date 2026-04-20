<template>
  <main>
    <h1>Vue 3 Utils Demo</h1>

    <section>
      <h2>Currency Formatter</h2>
      <label>
        Amount:
        <input v-model.number="amount" type="number" step="0.01" />
      </label>
      <p>Formatted: <strong>{{ formatCurrency(amount) }}</strong></p>
    </section>

    <section>
      <h2>Date Formatter</h2>
      <label>
        Date:
        <input v-model="rawDate" type="date" />
      </label>
      <p>Formatted: <strong>{{ formatDate(rawDate) }}</strong></p>
    </section>

    <section>
      <h2>Window Focus</h2>
      <p :class="isFocused ? 'focused' : 'blurred'">
        Window is: <strong>{{ isFocused ? 'Focused' : 'Blurred' }}</strong>
      </p>
      <p class="hint">Click outside the browser window to test.</p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useFormatters } from './composables/useFormatters'
import { useWindowFocus } from './composables/useWindowFocus'

const { formatCurrency, formatDate } = useFormatters()
const { isFocused } = useWindowFocus()

const amount = ref(1234.5)
const rawDate = ref(new Date().toISOString().slice(0, 10))
</script>

<style scoped>
main {
  font-family: sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 0 1rem;
}
section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
h2 { margin-top: 0; }
input {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.focused { color: green; }
.blurred { color: gray; }
.hint { font-size: 0.85rem; color: #888; }
</style>
