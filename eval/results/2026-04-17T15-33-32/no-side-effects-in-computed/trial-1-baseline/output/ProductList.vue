<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Keyboard', price: 79.99, inStock: true },
  { name: 'Mouse', price: 29.99, inStock: false },
  { name: 'Monitor', price: 299.0, inStock: true },
  { name: 'Webcam', price: 59.5, inStock: false },
  { name: 'Headphones', price: 129.99, inStock: true },
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
        <span class="name">{{ product.name }}</span>
        <span class="price">${{ product.price.toFixed(2) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.product-list {
  font-family: system-ui, sans-serif;
}
.product-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
}
.price {
  color: #555;
}
</style>
