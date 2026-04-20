<script setup>
import { formatCurrency } from './utils/formatCurrency.js';
import { formatDate } from './utils/formatDate.js';
import { useWindowFocus } from './composables/useWindowFocus.js';

const { isFocused } = useWindowFocus();
</script>

<template>
  <div>
    <p>Price: {{ formatCurrency(1234.5) }}</p>
    <p>Today: {{ formatDate(new Date()) }}</p>
    <p>Window focused: {{ isFocused ? 'yes' : 'no' }}</p>
  </div>
</template>
