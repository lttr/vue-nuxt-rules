<script setup>
import { formatCurrency } from './utils/formatCurrency'
import { formatDate } from './utils/formatDate'
import { useWindowFocus } from './composables/useWindowFocus'

const price = formatCurrency(1234.5)
const today = formatDate(new Date())
const focused = useWindowFocus()
</script>

<template>
  <main>
    <p>Price: {{ price }}</p>
    <p>Date: {{ today }}</p>
    <p>Window focused: {{ focused ? 'yes' : 'no' }}</p>
  </main>
</template>
