<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Notebook', price: 4.5, inStock: true },
  { name: 'Pen', price: 1.2, inStock: false },
  { name: 'Backpack', price: 39.0, inStock: true },
  { name: 'Eraser', price: 0.8, inStock: false },
  { name: 'Stapler', price: 12.0, inStock: true },
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
    <h2>In-stock products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </section>
</template>
