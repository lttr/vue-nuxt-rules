<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Wireless Headphones', price: 59.99, inStock: true },
  { name: 'USB-C Cable', price: 12.99, inStock: true },
  { name: 'Mechanical Keyboard', price: 129.99, inStock: false },
  { name: 'Monitor Stand', price: 39.99, inStock: true },
  { name: 'Webcam', price: 79.99, inStock: false },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() => {
  return products.value.filter((p) => p.inStock)
})

watch(inStockProducts, (filtered) => {
  lastFilteredCount.value = filtered.length
}, { immediate: true })
</script>

<template>
  <div>
    <h2>In-Stock Products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>

    <h3>All Products</h3>
    <ul>
      <li v-for="product in products" :key="product.name">
        <label>
          <input type="checkbox" v-model="product.inStock" />
          {{ product.name }} — ${{ product.price.toFixed(2) }}
          <span v-if="!product.inStock"> (out of stock)</span>
        </label>
      </li>
    </ul>
  </div>
</template>
