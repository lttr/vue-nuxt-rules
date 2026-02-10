<script setup>
import { ref, computed } from 'vue';
import { formatCurrency } from './composables/useFormatCurrency.js';
import { formatDate } from './composables/useFormatDate.js';
import { useWindowFocus } from './composables/useWindowFocus.js';

const { isFocused } = useWindowFocus();

const currencyInput = ref(1234.5);
const formattedCurrency = computed(() => formatCurrency(currencyInput.value));

const dateInput = ref(new Date().toISOString().slice(0, 10));
const formattedDate = computed(() => formatDate(dateInput.value));
</script>

<template>
  <div id="app">
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Currency Formatter</h2>
      <label>
        Enter a number:
        <input v-model.number="currencyInput" type="number" step="0.01" />
      </label>
      <p>Formatted: <strong>{{ formattedCurrency }}</strong></p>
    </section>

    <section>
      <h2>Date Formatter</h2>
      <label>
        Pick a date:
        <input v-model="dateInput" type="date" />
      </label>
      <p>Formatted: <strong>{{ formattedDate }}</strong></p>
    </section>

    <section>
      <h2>Window Focus Tracker</h2>
      <p>
        Window is currently:
        <strong :style="{ color: isFocused ? 'green' : 'red' }">
          {{ isFocused ? 'Focused' : 'Not Focused' }}
        </strong>
      </p>
      <p class="hint">Click outside the browser window to see this change.</p>
    </section>
  </div>
</template>

<style>
#app {
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
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

input {
  padding: 0.4rem;
  font-size: 1rem;
  margin-left: 0.5rem;
}

.hint {
  color: #888;
  font-size: 0.85rem;
}
</style>
