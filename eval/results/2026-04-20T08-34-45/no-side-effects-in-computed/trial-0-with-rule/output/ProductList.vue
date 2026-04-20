<template>
  <div>
    <p>In-stock count: {{ lastFilteredCount }}</p>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Widget A', price: 9.99, inStock: true },
  { name: 'Widget B', price: 14.99, inStock: false },
  { name: 'Gadget X', price: 49.99, inStock: true },
  { name: 'Gadget Y', price: 29.99, inStock: true },
  { name: 'Doohickey', price: 4.99, inStock: false },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() =>
  products.value.filter(p => p.inStock)
)

watch(inStockProducts, (items) => {
  lastFilteredCount.value = items.length
}, { immediate: true })
</script>
