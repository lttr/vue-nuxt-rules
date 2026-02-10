<script setup>
import { ref, computed } from 'vue';
import { formatCurrency } from './utils/formatCurrency';
import { formatDate } from './utils/formatDate';
import { useWindowFocus } from './composables/useWindowFocus';

const amount = ref(1234.5);
const formattedAmount = computed(() => formatCurrency(amount.value));

const now = new Date();
const formattedDate = formatDate(now);

const { isFocused } = useWindowFocus();
</script>

<template>
  <div class="app">
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Currency Formatting</h2>
      <label>
        Amount:
        <input v-model.number="amount" type="number" step="0.01" />
      </label>
      <p>Formatted: <strong>{{ formattedAmount }}</strong></p>
    </section>

    <section>
      <h2>Date Formatting</h2>
      <p>Today: <strong>{{ formattedDate }}</strong></p>
    </section>

    <section>
      <h2>Window Focus</h2>
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

<style scoped>
.app {
  max-width: 600px;
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
  padding: 0.4rem;
  font-size: 1rem;
}
.hint {
  font-size: 0.85rem;
  color: #888;
}
</style>
