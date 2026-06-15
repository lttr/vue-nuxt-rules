<script setup>
import { formatCurrency, formatDate } from '../utils/format.js'
import { useWindowFocus } from '../composables/useWindowFocus.js'

const { focused } = useWindowFocus()

const amount = 1234.5
const today = new Date()
</script>

<template>
  <section>
    <p>Price: {{ formatCurrency(amount) }}</p>
    <p>Date: {{ formatDate(today) }}</p>
    <p>Window is {{ focused ? 'focused' : 'not focused' }}</p>
  </section>
</template>
