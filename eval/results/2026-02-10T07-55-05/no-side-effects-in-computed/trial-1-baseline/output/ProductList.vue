<script setup>
import { ref, computed, watch } from 'vue'

const products = ref([
  { name: 'Wireless Keyboard', price: 49.99, inStock: true },
  { name: 'USB-C Hub', price: 34.99, inStock: false },
  { name: 'Monitor Stand', price: 79.99, inStock: true },
  { name: 'Webcam HD', price: 59.99, inStock: true },
  { name: 'Laptop Sleeve', price: 24.99, inStock: false },
  { name: 'Mouse Pad XL', price: 19.99, inStock: true },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() => {
  return products.value.filter((p) => p.inStock)
})

watch(
  inStockProducts,
  (filtered) => {
    lastFilteredCount.value = filtered.length
  },
  { immediate: true }
)
</script>

<template>
  <div class="product-list">
    <h2>In-Stock Products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>

    <h2>All Products</h2>
    <ul>
      <li
        v-for="product in products"
        :key="product.name"
        :class="{ 'out-of-stock': !product.inStock }"
      >
        <label>
          <input type="checkbox" v-model="product.inStock" />
          {{ product.name }} — ${{ product.price.toFixed(2) }}
          <span v-if="!product.inStock"> (Out of Stock)</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.product-list {
  font-family: sans-serif;
  max-width: 480px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 6px 0;
}

.out-of-stock {
  opacity: 0.5;
}
</style>
