<script setup>
import { formatCurrency } from './utils/formatCurrency.js'
import { formatDate } from './utils/formatDate.js'
import { useWindowFocus } from './composables/useWindowFocus.js'

const focused = useWindowFocus()
const price = 1234.5
const now = new Date()
</script>

<template>
  <main>
    <h1>Vue Utils Demo</h1>
    <p>Price: {{ formatCurrency(price) }}</p>
    <p>Today: {{ formatDate(now) }}</p>
    <p>Window is {{ focused ? 'focused' : 'blurred' }}</p>
  </main>
</template>
