<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Keyboard', price: 79.99, inStock: true },
  { name: 'Mouse', price: 29.99, inStock: false },
  { name: 'Monitor', price: 249.0, inStock: true },
  { name: 'Webcam', price: 59.5, inStock: false },
  { name: 'Desk Mat', price: 19.99, inStock: true },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() =>
  products.value.filter((p) => p.inStock)
)

watch(
  inStockProducts,
  (list) => {
    lastFilteredCount.value = list.length
  },
  { immediate: true }
)
</script>

<template>
  <section>
    <h2>In-Stock Products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </section>
</template>
