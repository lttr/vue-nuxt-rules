<script setup lang="ts">
import { ref } from 'vue'
import { useFormatCurrency } from './composables/useFormatCurrency'
import { useFormatDate } from './composables/useFormatDate'
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
    </section>

    <section>
      <h2>Date Formatting</h2>
      <p>Today: <strong>{{ formattedDate }}</strong></p>
    </section>

    <section>
      <h2>Window Focus</h2>
      <p>
        Window is currently:
        <strong :class="isFocused ? 'focused' : 'blurred'">
          {{ isFocused ? 'Focused' : 'Not Focused' }}
        </strong>
      </p>
      <p class="hint">Click outside the browser window to see this change.</p>
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
}
section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  padding: 0.3rem 0.5rem;
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
