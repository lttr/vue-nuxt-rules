<template>
  <div>
    <p>Showing {{ lastFilteredCount }} in-stock product(s)</p>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Widget A', price: 9.99, inStock: true },
  { name: 'Widget B', price: 14.99, inStock: false },
  { name: 'Gadget C', price: 24.99, inStock: true },
  { name: 'Gadget D', price: 4.99, inStock: false },
  { name: 'Doohickey E', price: 39.99, inStock: true },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() =>
  products.value.filter(p => p.inStock)
)

watch(
  inStockProducts,
  filtered => { lastFilteredCount.value = filtered.length },
  { immediate: true }
)
</script>
