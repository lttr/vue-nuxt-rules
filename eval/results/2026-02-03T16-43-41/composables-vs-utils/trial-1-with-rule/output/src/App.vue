<script setup lang="ts">
import { formatCurrency, formatDate } from './utils/formatters';
import { useWindowFocus } from './composables/useWindowFocus';

const { isFocused } = useWindowFocus();

const price = 1234.5;
const orderDate = new Date();
</script>

<template>
  <div class="app">
    <h1>Vue 3 Formatting Demo</h1>

    <section>
      <h2>Currency Formatting</h2>
      <p>Raw value: {{ price }}</p>
      <p>Formatted: {{ formatCurrency(price) }}</p>
    </section>

    <section>
      <h2>Date Formatting</h2>
      <p>Formatted: {{ formatDate(orderDate) }}</p>
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
  max-width: 600px;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
}

section {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.focused {
  color: green;
}

.blurred {
  color: gray;
}
</style>
