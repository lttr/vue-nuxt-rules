<script setup>
import { formatCurrency } from './utils/formatCurrency.js'
import { formatDate } from './utils/formatDate.js'
import { useWindowFocus } from './composables/useWindowFocus.js'

const { isFocused } = useWindowFocus()

const price = 1234.5
const today = new Date()
</script>

<template>
  <main>
    <h1>Vue Utils Demo</h1>
    <p>Price: {{ formatCurrency(price) }}</p>
    <p>Today: {{ formatDate(today) }}</p>
    <p>Window is {{ isFocused ? 'focused' : 'not focused' }}</p>
  </main>
</template>
