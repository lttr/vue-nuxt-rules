<template>
  <div class="product-grid">
    <div v-for="product of products" :key="product.id" class="product-card">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number | string
  name: string
  price: number
  imageUrl: string
}

defineProps<{
  products: Product[]
}>()

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.product-name {
  margin: 0.75rem 0 0.5rem;
  font-size: 1.1rem;
}

.product-price {
  margin: 0;
  font-weight: bold;
  color: #2c7a2c;
}
</style>
