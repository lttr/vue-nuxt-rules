<script setup>
import { formatCurrency } from './utils/formatCurrency.js'
import { formatDate } from './utils/formatDate.js'
import { useWindowFocus } from './composables/useWindowFocus.js'

const { focused } = useWindowFocus()

const price = 1234.5
const today = new Date()
</script>

<template>
  <main>
    <p>Price: {{ formatCurrency(price) }}</p>
    <p>Date: {{ formatDate(today) }}</p>
    <p>Window is {{ focused ? 'focused' : 'not focused' }}</p>
  </main>
</template>
