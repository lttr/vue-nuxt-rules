<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Keyboard', price: 49.99, inStock: true },
  { name: 'Mouse', price: 24.99, inStock: false },
  { name: 'Monitor', price: 199.99, inStock: true },
  { name: 'Webcam', price: 79.99, inStock: false },
  { name: 'Headset', price: 89.99, inStock: true },
])

// Tracks how many items the last filter pass returned.
const lastFilteredCount = ref(0)

// Filters to in-stock items. The side effect of updating lastFilteredCount
// lives here as requested. Note: mutating a ref inside a computed is normally
// discouraged (computeds should be pure) — a watchEffect is the idiomatic spot
// for this. It works because the computed re-evaluates whenever `products`
// changes, but be aware of this caveat if the count is read before the
// computed has been accessed.
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
    <p v-if="inStockProducts.length === 0">No products in stock.</p>
  </div>
</template>

<style scoped>
.product-list {
  font-family: system-ui, sans-serif;
  max-width: 360px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.price {
  font-weight: 600;
}
</style>
