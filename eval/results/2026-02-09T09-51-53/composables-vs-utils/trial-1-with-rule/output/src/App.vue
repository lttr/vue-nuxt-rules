<script setup lang="ts">
import { formatCurrency } from './utils/formatCurrency';
import { formatDate } from './utils/formatDate';
import { useWindowFocus } from './composables/useWindowFocus';

const { isFocused } = useWindowFocus();

const price = 1234.5;
const today = new Date();
</script>

<template>
  <div>
    <h1>Vue 3 Utilities Demo</h1>

    <section>
      <h2>Currency Formatting</h2>
      <p>{{ formatCurrency(price) }}</p>
    </section>

    <section>
      <h2>Date Formatting</h2>
      <p>{{ formatDate(today) }}</p>
    </section>

    <section>
      <h2>Window Focus</h2>
      <p>Window is {{ isFocused ? 'focused' : 'not focused' }}</p>
    </section>
  </div>
</template>
