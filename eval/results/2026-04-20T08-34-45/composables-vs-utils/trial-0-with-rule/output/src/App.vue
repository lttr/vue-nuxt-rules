<template>
  <main>
    <section>
      <h2>Currency</h2>
      <p>{{ formatCurrency(1234.5) }}</p>
      <p>{{ formatCurrency(9999999.99, 'EUR', 'de-DE') }}</p>
    </section>

    <section>
      <h2>Date</h2>
      <p>{{ formatDate(new Date()) }}</p>
      <p>{{ formatDate('2024-07-04', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }) }}</p>
    </section>

    <section>
      <h2>Window Focus</h2>
      <p :style="{ color: isFocused ? 'green' : 'red' }">
        Window is {{ isFocused ? 'focused' : 'blurred' }}
      </p>
    </section>
  </main>
</template>

<script setup>
import { formatCurrency, formatDate } from './utils/format.js'
import { useWindowFocus } from './composables/useWindowFocus.js'

const { isFocused } = useWindowFocus()
</script>
