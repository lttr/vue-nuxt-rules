<script setup>
import { formatCurrency, formatDate } from './utils/format.js'
import { useWindowFocus } from './composables/useWindowFocus.js'

const { focused } = useWindowFocus()

const price = 1234.5
const now = new Date()
</script>

<template>
  <main>
    <h1>Vue Utils Demo</h1>
    <p>Price: {{ formatCurrency(price) }}</p>
    <p>Today: {{ formatDate(now) }}</p>
    <p>Window is {{ focused ? 'focused' : 'not focused' }}</p>
  </main>
</template>
