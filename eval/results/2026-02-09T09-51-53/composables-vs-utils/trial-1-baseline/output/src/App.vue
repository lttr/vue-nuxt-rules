<script setup>
import { ref, computed } from 'vue';
import { formatCurrency } from './utils/formatCurrency';
import { formatDate } from './utils/formatDate';
import { useWindowFocus } from './composables/useWindowFocus';

// --- Currency demo ---
const rawAmount = ref(1234.5);
const formattedAmount = computed(() => formatCurrency(rawAmount.value));

// --- Date demo ---
const now = new Date();
const formattedDateLong = computed(() => formatDate(now));
const formattedDateShort = computed(() =>
  formatDate(now, { year: 'numeric', month: '2-digit', day: '2-digit' }),
);

// --- Window focus tracking ---
const { isFocused } = useWindowFocus();
</script>

<template>
  <div class="app">
    <h1>Vue 3 Utilities Demo</h1>

    <!-- Currency formatting -->
    <section>
      <h2>Currency Formatter</h2>
      <label>
        Enter a number:
        <input v-model.number="rawAmount" type="number" step="0.01" />
      </label>
      <p>Formatted: <strong>{{ formattedAmount }}</strong></p>
    </section>

    <!-- Date formatting -->
    <section>
      <h2>Date Formatter</h2>
      <p>Long format: <strong>{{ formattedDateLong }}</strong></p>
      <p>Short format: <strong>{{ formattedDateShort }}</strong></p>
    </section>

    <!-- Window focus -->
    <section>
      <h2>Window Focus Tracker</h2>
      <p>
        Window is currently:
        <strong :class="isFocused ? 'focused' : 'blurred'">
          {{ isFocused ? 'Focused' : 'Not Focused' }}
        </strong>
      </p>
      <p class="hint">Click outside the browser window to see the status change.</p>
    </section>
  </div>
</template>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

input {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
}

.focused {
  color: #2e7d32;
}

.blurred {
  color: #c62828;
}

.hint {
  font-size: 0.85rem;
  color: #757575;
}
</style>
