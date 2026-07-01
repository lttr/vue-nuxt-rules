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
import { ref, reactive, computed, watchEffect } from 'vue'

const products = reactive([
  { name: 'Widget', price: 9.99, inStock: true },
  { name: 'Gadget', price: 19.99, inStock: false },
  { name: 'Gizmo', price: 14.5, inStock: true },
  { name: 'Doohickey', price: 4.25, inStock: false },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() => products.filter(p => p.inStock))

watchEffect(() => {
  lastFilteredCount.value = inStockProducts.value.length
})
</script>
