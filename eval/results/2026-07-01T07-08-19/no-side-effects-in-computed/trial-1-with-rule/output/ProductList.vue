<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Widget', price: 9.99, inStock: true },
  { name: 'Gadget', price: 19.99, inStock: false },
  { name: 'Gizmo', price: 14.99, inStock: true },
])

const inStockProducts = computed(() =>
  products.value.filter((product) => product.inStock)
)

const lastFilteredCount = ref(inStockProducts.value.length)

watch(inStockProducts, (items) => {
  lastFilteredCount.value = items.length
})
</script>

<template>
  <div class="product-list">
    <p>In stock: {{ lastFilteredCount }}</p>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} - ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>
