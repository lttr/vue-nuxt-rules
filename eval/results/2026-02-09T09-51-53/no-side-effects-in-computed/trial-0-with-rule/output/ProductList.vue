<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Laptop', price: 999.99, inStock: true },
  { name: 'Headphones', price: 149.99, inStock: false },
  { name: 'Keyboard', price: 79.99, inStock: true },
  { name: 'Mouse', price: 49.99, inStock: true },
  { name: 'Monitor', price: 399.99, inStock: false },
])

const inStockProducts = computed(() => {
  return products.value.filter((p) => p.inStock)
})

const lastFilteredCount = computed(() => {
  return inStockProducts.value.length
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
