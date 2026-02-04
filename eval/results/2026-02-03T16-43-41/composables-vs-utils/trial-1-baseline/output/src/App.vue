<script setup lang="ts">
import { ref } from 'vue';
import { formatCurrency, formatDate } from './utils/formatters';
import { useWindowFocus } from './composables/useWindowFocus';

const { isFocused } = useWindowFocus();

const amount = ref(1234.5);
const selectedDate = ref(new Date());
</script>

<template>
  <div class="app">
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Window Focus</h2>
      <p :class="{ focused: isFocused, blurred: !isFocused }">
        Window is: <strong>{{ isFocused ? 'Focused' : 'Not Focused' }}</strong>
      </p>
      <p class="hint">Click outside this window to see the status change</p>
    </section>

    <section>
      <h2>Currency Formatter</h2>
      <label>
        Amount:
        <input v-model.number="amount" type="number" step="0.01" />
      </label>
      <p>Formatted: <strong>{{ formatCurrency(amount) }}</strong></p>
      <p>EUR: <strong>{{ formatCurrency(amount, 'EUR', 'de-DE') }}</strong></p>
      <p>GBP: <strong>{{ formatCurrency(amount, 'GBP', 'en-GB') }}</strong></p>
    </section>

    <section>
      <h2>Date Formatter</h2>
      <label>
        Date:
        <input v-model="selectedDate" type="date" />
      </label>
      <p>Short: <strong>{{ formatDate(selectedDate, 'short') }}</strong></p>
      <p>Medium: <strong>{{ formatDate(selectedDate, 'medium') }}</strong></p>
      <p>Long: <strong>{{ formatDate(selectedDate, 'long') }}</strong></p>
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.focused {
  color: green;
}

.blurred {
  color: red;
}

.hint {
  font-size: 0.875rem;
  color: #666;
}
</style>
