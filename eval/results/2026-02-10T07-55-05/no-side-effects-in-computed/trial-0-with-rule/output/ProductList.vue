<template>
  <div class="product-list">
    <h2>Products</h2>

    <h3>In Stock ({{ lastFilteredCount }})</h3>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} - ${{ product.price.toFixed(2) }}
      </li>
    </ul>

    <h3>All Products</h3>
    <ul>
      <li v-for="product in products" :key="product.name">
        {{ product.name }} - ${{ product.price.toFixed(2) }}
        <span v-if="!product.inStock"> (Out of stock)</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const products = ref([
  { name: 'Wireless Keyboard', price: 49.99, inStock: true },
  { name: 'USB-C Hub', price: 34.99, inStock: false },
  { name: 'Monitor Stand', price: 89.99, inStock: true },
  { name: 'Webcam HD', price: 59.99, inStock: true },
  { name: 'Laptop Sleeve', price: 24.99, inStock: false },
]);

const inStockProducts = computed(() => {
  return products.value.filter((product) => product.inStock);
});

const lastFilteredCount = computed(() => {
  return inStockProducts.value.length;
});
</script>
