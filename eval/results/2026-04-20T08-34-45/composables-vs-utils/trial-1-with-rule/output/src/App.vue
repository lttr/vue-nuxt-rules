<template>
  <div>
    <p>Window: {{ isFocused ? 'focused' : 'blurred' }}</p>
    <p>{{ formatCurrency(1234.5) }}</p>
    <p>{{ formatDate(new Date()) }}</p>
  </div>
</template>

<script setup>
import { formatCurrency, formatDate } from './utils/format.js'
import { useWindowFocus } from './composables/useWindowFocus.js'

const { isFocused } = useWindowFocus()
</script>
