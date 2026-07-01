<template>
  <div class="product-list">
    <h2>Products</h2>
    <p>In stock: {{ lastFilteredCount }}</p>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} - ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Widget', price: 9.99, inStock: true },
  { name: 'Gadget', price: 19.99, inStock: false },
  { name: 'Gizmo', price: 14.5, inStock: true },
  { name: 'Doohickey', price: 4.25, inStock: false },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() => {
  const filtered = products.value.filter((product) => product.inStock)
  lastFilteredCount.value = filtered.length
  return filtered
})
</script>
