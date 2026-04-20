<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Keyboard', price: 79.99, inStock: true },
  { name: 'Mouse', price: 29.99, inStock: false },
  { name: 'Monitor', price: 299.99, inStock: true },
  { name: 'Webcam', price: 59.99, inStock: false },
  { name: 'Headphones', price: 149.99, inStock: true },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() => {
  const filtered = products.value.filter((p) => p.inStock)
  lastFilteredCount.value = filtered.length
  return filtered
})
</script>

<template>
  <div class="product-list">
    <h2>In-Stock Products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>
