<script setup>
import { ref, computed, watchEffect } from 'vue'

const products = ref([
  { name: 'Widget', price: 9.99, inStock: true },
  { name: 'Gadget', price: 14.5, inStock: false },
  { name: 'Sprocket', price: 4.25, inStock: true },
  { name: 'Doohickey', price: 7.0, inStock: false },
  { name: 'Thingamajig', price: 12.0, inStock: true },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() =>
  products.value.filter((p) => p.inStock)
)

watchEffect(() => {
  lastFilteredCount.value = inStockProducts.value.length
})
</script>

<template>
  <section>
    <h2>In-Stock Products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </section>
</template>
