<script setup lang="ts">
import { formatCurrency, formatDate } from './utils/formatters'
import { useWindowFocus } from './composables/useWindowFocus'

const { isFocused } = useWindowFocus()

const price = 1234.5
const orderDate = new Date()
</script>

<template>
  <div class="app">
    <h1>Vue 3 Formatting Demo</h1>

    <section>
      <h2>Currency Formatting</h2>
      <p>{{ formatCurrency(price) }}</p>
      <p>{{ formatCurrency(price, 'EUR', 'de-DE') }}</p>
    </section>

    <section>
      <h2>Date Formatting</h2>
      <p>{{ formatDate(orderDate) }}</p>
      <p>{{ formatDate(orderDate, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
    </section>

    <section>
      <h2>Window Focus</h2>
      <p :class="{ focused: isFocused, blurred: !isFocused }">
        Window is {{ isFocused ? 'focused' : 'not focused' }}
      </p>
    </section>
  </div>
</template>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

section {
  margin-bottom: 2rem;
}

.focused {
  color: green;
}

.blurred {
  color: gray;
}
</style>
