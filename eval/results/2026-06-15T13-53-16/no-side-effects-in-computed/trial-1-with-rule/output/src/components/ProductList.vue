<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Keyboard', price: 49.99, inStock: true },
  { name: 'Mouse', price: 19.99, inStock: false },
  { name: 'Monitor', price: 199.99, inStock: true },
  { name: 'Webcam', price: 79.99, inStock: false },
  { name: 'Desk Lamp', price: 24.99, inStock: true },
])

// Pure computed: derives the in-stock list only. No mutations/side effects.
const inStockProducts = computed(() =>
  products.value.filter((p) => p.inStock)
)

const lastFilteredCount = ref(0)

// Side effect (updating the ref) lives in a watcher, not the computed.
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
