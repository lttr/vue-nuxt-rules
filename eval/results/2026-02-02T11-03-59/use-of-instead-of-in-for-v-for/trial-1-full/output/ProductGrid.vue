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
    currency: 'USD',
  }).format(price)
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.product-name {
  margin: 0.75rem 1rem 0.25rem;
  font-size: 1rem;
}

.product-price {
  margin: 0.25rem 1rem 0.75rem;
  font-weight: 600;
  color: #333;
}
</style>
