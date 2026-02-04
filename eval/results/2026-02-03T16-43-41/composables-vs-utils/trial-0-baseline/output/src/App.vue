<script setup lang="ts">
import { ref } from 'vue';
import { formatCurrency, formatDate } from './utils/formatters';
import { useWindowFocus } from './composables/useWindowFocus';

const { isFocused } = useWindowFocus();

const amount = ref(1234.5);
const currentDate = ref(new Date());
</script>

<template>
  <div class="app">
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Currency Formatting</h2>
      <p>Raw value: {{ amount }}</p>
      <p>Formatted: {{ formatCurrency(amount) }}</p>
      <p>EUR: {{ formatCurrency(amount, 'EUR', 'de-DE') }}</p>
    </section>

    <section>
      <h2>Date Formatting</h2>
      <p>Short: {{ formatDate(currentDate, 'short') }}</p>
      <p>Long: {{ formatDate(currentDate, 'long') }}</p>
      <p>Full: {{ formatDate(currentDate, 'full') }}</p>
    </section>

    <section>
      <h2>Window Focus</h2>
      <p :class="{ focused: isFocused, blurred: !isFocused }">
        Window is {{ isFocused ? 'focused' : 'not focused' }}
      </p>
      <p class="hint">Click outside this browser window to see the status change</p>
    </section>
  </div>
</template>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
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

.focused {
  color: green;
  font-weight: bold;
}

.blurred {
  color: red;
  font-weight: bold;
}

.hint {
  font-size: 0.875rem;
  color: #666;
}
</style>
