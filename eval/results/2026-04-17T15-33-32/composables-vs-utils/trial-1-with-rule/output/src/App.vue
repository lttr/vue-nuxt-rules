<script setup>
import { formatCurrency } from './utils/formatCurrency'
import { formatDate } from './utils/formatDate'
import { useWindowFocus } from './composables/useWindowFocus'

const { focused } = useWindowFocus()
</script>

<template>
  <main>
    <p>Price: {{ formatCurrency(1234.5) }}</p>
    <p>Today: {{ formatDate(new Date()) }}</p>
    <p>Window is {{ focused ? 'focused' : 'blurred' }}</p>
  </main>
</template>
