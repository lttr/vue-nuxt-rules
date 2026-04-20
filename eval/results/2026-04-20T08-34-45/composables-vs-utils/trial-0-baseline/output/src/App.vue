<template>
  <main>
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Window Focus</h2>
      <div :class="['focus-badge', isFocused ? 'focused' : 'blurred']">
        {{ isFocused ? 'Window is focused' : 'Window is blurred' }}
      </div>
    </section>

    <section>
      <h2>Currency Formatter</h2>
      <label>
        Amount
        <input v-model="rawAmount" type="number" step="0.01" placeholder="e.g. 1234.5" />
      </label>
      <p class="result">{{ formatCurrency(rawAmount) }}</p>
    </section>

    <section>
      <h2>Date Formatter</h2>
      <label>
        Date
        <input v-model="rawDate" type="date" />
      </label>
      <p class="result">{{ formatDate(rawDate) }}</p>
      <p class="result secondary">
        Short: {{ formatDate(rawDate, { year: 'numeric', month: 'short', day: 'numeric' }) }}
      </p>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { formatCurrency, formatDate } from './utils/formatters.js'
import { useWindowFocus } from './composables/useWindowFocus.js'

const { isFocused } = useWindowFocus()

const rawAmount = ref(1234.5)
const rawDate = ref(new Date().toISOString().slice(0, 10))
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, sans-serif;
  background: #f5f5f5;
  color: #1a1a1a;
}

main {
  max-width: 560px;
  margin: 48px auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

h1 { font-size: 1.6rem; }
h2 { font-size: 1.1rem; margin-bottom: 12px; color: #444; }

section {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.85rem;
  color: #555;
}

input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
}

.result {
  margin-top: 12px;
  font-size: 1.25rem;
  font-weight: 600;
}

.result.secondary {
  font-size: 1rem;
  font-weight: 400;
  color: #555;
  margin-top: 4px;
}

.focus-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.focused {
  background: #d1fae5;
  color: #065f46;
}

.blurred {
  background: #fee2e2;
  color: #991b1b;
}
</style>
