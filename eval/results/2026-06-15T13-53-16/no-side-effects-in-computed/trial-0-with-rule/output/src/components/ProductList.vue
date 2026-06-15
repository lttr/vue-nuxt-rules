<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Keyboard', price: 49.99, inStock: true },
  { name: 'Mouse', price: 24.99, inStock: false },
  { name: 'Monitor', price: 199.99, inStock: true },
  { name: 'Webcam', price: 79.99, inStock: false },
  { name: 'Headset', price: 89.99, inStock: true },
])

// Tracks how many items the last filter pass produced.
const lastFilteredCount = ref(0)

// Pure computed: derives the in-stock list with no mutations or side effects.
const inStockProducts = computed(() =>
  products.value.filter((product) => product.inStock)
)

// Side effect lives here, not in the computed, so the computed stays pure.
watch(
  inStockProducts,
  (items) => {
    lastFilteredCount.value = items.length
  },
  { immediate: true }
)
</script>

<template>
  <section>
    <h2>In-stock products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </section>
</template>
