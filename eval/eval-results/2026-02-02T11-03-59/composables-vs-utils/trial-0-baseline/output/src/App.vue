<script setup lang="ts">
import { ref } from 'vue'
import { formatCurrency, useFormatCurrency } from './composables/useFormatCurrency'
import { formatDate, useFormatDate } from './composables/useFormatDate'
import { useWindowFocus } from './composables/useWindowFocus'

const price = ref(1234.5)
const { formatted: formattedPrice } = useFormatCurrency(price)

const now = ref(new Date())
const { formatted: formattedDate } = useFormatDate(now)

const { isFocused } = useWindowFocus()
</script>

<template>
  <div class="app">
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Currency Formatting</h2>
      <label>
        Amount: <input v-model.number="price" type="number" step="0.01" />
      </label>
      <p>Formatted: <strong>{{ formattedPrice }}</strong></p>
      <p>One-off call: <strong>{{ formatCurrency(99999.9) }}</strong></p>
    </section>

    <section>
      <h2>Date Formatting</h2>
      <p>Today: <strong>{{ formattedDate }}</strong></p>
      <p>One-off call: <strong>{{ formatDate('2025-12-25') }}</strong></p>
    </section>

    <section>
      <h2>Window Focus</h2>
      <p :class="isFocused ? 'focused' : 'blurred'">
        Window is currently: <strong>{{ isFocused ? 'Focused' : 'Not Focused' }}</strong>
      </p>
      <p class="hint">Click outside the browser window to see this change.</p>
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
}
section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  padding: 0.4rem;
  font-size: 1rem;
}
.focused {
  color: green;
}
.blurred {
  color: red;
}
.hint {
  font-size: 0.85rem;
  color: #888;
}
</style>
