<template>
  <div class="product-grid">
    <div v-for="product of products" :key="product.id" class="product-card">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
  },
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
}

.product-image {
  width: 100%;
  max-width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
}

.product-name {
  margin: 0.5rem 0 0.25rem;
  font-size: 1rem;
}

.product-price {
  margin: 0;
  font-weight: bold;
  color: #2c3e50;
}
</style>
