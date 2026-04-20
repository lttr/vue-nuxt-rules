<template>
  <div class="product-list">
    <h2>All Products</h2>
    <ul>
      <li v-for="product in products" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
        <span :class="product.inStock ? 'badge-in' : 'badge-out'">
          {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
        </span>
      </li>
    </ul>

    <h2>In-Stock Products ({{ lastFilteredCount }})</h2>
    <ul>
      <li v-for="product in inStockProducts" :key="product.name">
        {{ product.name }} — ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Keyboard',   price: 79.99,  inStock: true  },
  { name: 'Mouse',      price: 29.99,  inStock: false },
  { name: 'Monitor',    price: 349.99, inStock: true  },
  { name: 'Webcam',     price: 89.99,  inStock: false },
  { name: 'Headphones', price: 59.99,  inStock: true  },
])

const lastFilteredCount = ref(0)

const inStockProducts = computed(() => {
  const filtered = products.value.filter(p => p.inStock)
  lastFilteredCount.value = filtered.length
  return filtered
})
</script>

<style scoped>
.product-list { font-family: sans-serif; max-width: 480px; margin: 2rem auto; }
ul { list-style: none; padding: 0; }
li { padding: 0.4rem 0; border-bottom: 1px solid #eee; }
.badge-in  { margin-left: 0.5rem; color: green; font-size: 0.8em; }
.badge-out { margin-left: 0.5rem; color: red;   font-size: 0.8em; }
</style>
