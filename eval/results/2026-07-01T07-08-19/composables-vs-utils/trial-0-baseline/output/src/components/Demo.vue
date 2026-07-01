<script setup>
import { formatCurrency, formatDate } from '../utils/format.js'
import { useWindowFocus } from '../composables/useWindowFocus.js'

const { isFocused } = useWindowFocus()
</script>

<template>
  <div class="demo">
    <p>{{ formatCurrency(1234.5) }}</p>
    <p>{{ formatDate(new Date()) }}</p>
    <p>Window is {{ isFocused ? 'focused' : 'blurred' }}</p>
  </div>
</template>
