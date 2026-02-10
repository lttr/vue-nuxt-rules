<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Laptop', price: 999.99, inStock: true },
  { name: 'Headphones', price: 149.99, inStock: false },
  { name: 'Keyboard', price: 79.99, inStock: true },
  { name: 'Mouse', price: 49.99, inStock: true },
  { name: 'Monitor', price: 399.99, inStock: false },
  { name: 'Webcam', price: 89.99, inStock: true },
])

const lastFilteredCount = ref(0)

// NOTE: Updating a ref inside a computed is a side effect and generally
// considered an anti-pattern in Vue. A watcher is the idiomatic approach
// for reacting to derived state changes. Done here per requirements.
const inStockProducts = computed(() => {
  const filtered = products.value.filter((p) => p.inStock)
  lastFilteredCount.value = filtered.length
  return filtered
})
</script>

<template>
  <div class="product-list">
    <h2>All Products</h2>
    <ul>
      <li v-for="product in products" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
        <span v-if="product.inStock" class="in-stock">In Stock</span>
        <span v-else class="out-of-stock">Out of Stock</span>
      </li>
    </ul>

    <h2>In-Stock Products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.product-list {
  font-family: sans-serif;
  max-width: 480px;
  margin: 0 auto;
}

li {
  margin: 0.4em 0;
}

.in-stock {
  color: green;
  font-weight: bold;
}

.out-of-stock {
  color: red;
}
</style>
