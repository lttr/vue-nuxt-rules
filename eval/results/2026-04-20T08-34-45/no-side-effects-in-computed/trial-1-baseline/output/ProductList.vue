<template>
  <div class="product-list">
    <h2>Products ({{ lastFilteredCount }} in stock)</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Widget A', price: 9.99, inStock: true },
  { name: 'Widget B', price: 14.99, inStock: false },
  { name: 'Gadget X', price: 49.99, inStock: true },
  { name: 'Gadget Y', price: 29.99, inStock: false },
  { name: 'Doohickey Z', price: 4.99, inStock: true },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() => {
  const filtered = products.value.filter(p => p.inStock)
  lastFilteredCount.value = filtered.length
  return filtered
})
</script>
