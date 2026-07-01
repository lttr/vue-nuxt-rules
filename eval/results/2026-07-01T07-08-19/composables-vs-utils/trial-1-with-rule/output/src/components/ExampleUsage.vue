<script setup>
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'
import { useWindowFocus } from '../composables/useWindowFocus'

const { isFocused } = useWindowFocus()
</script>

<template>
  <div>
    <p>{{ formatCurrency(1234.5) }}</p>
    <p>{{ formatDate(new Date()) }}</p>
    <p>Window is {{ isFocused ? 'focused' : 'blurred' }}</p>
  </div>
</template>
