<template>
  <div class="product-list">
    <h2>Products ({{ lastFilteredCount }} in stock)</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} - ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Widget', price: 9.99, inStock: true },
  { name: 'Gadget', price: 19.99, inStock: false },
  { name: 'Gizmo', price: 14.99, inStock: true },
  { name: 'Doohickey', price: 4.99, inStock: false },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() =>
  products.value.filter((product) => product.inStock)
)

watch(
  inStockProducts,
  (items) => {
    lastFilteredCount.value = items.length
  },
  { immediate: true }
)
</script>
