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
  <section class="product-list">
    <h2>In-Stock Products</h2>
    <p class="count">Showing {{ lastFilteredCount }} item(s)</p>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        <span class="name">{{ product.name }}</span>
        <span class="price">${{ product.price.toFixed(2) }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.product-list {
  font-family: system-ui, sans-serif;
  max-width: 420px;
}
.count {
  color: #666;
  font-size: 0.9rem;
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
  font-variant-numeric: tabular-nums;
}
</style>
