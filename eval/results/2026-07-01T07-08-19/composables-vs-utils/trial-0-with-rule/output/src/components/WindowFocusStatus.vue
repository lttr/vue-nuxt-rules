<script setup>
import { useWindowFocus } from '../composables/useWindowFocus'
import { formatCurrency } from '../utils/formatCurrency'
import { formatDate } from '../utils/formatDate'

const { isFocused } = useWindowFocus()
</script>

<template>
  <div>
    <p>Window is {{ isFocused ? 'focused' : 'blurred' }}</p>
    <p>{{ formatCurrency(1234.5) }}</p>
    <p>{{ formatDate(new Date()) }}</p>
  </div>
</template>
