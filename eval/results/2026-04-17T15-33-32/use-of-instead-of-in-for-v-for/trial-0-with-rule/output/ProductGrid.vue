<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
</script>

<template>
  <div class="product-grid">
    <article
      v-for="product of products"
      :key="product.id"
      class="product-card"
    >
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </article>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.75rem 1rem 0.25rem;
}

.product-price {
  font-size: 0.95rem;
  color: #374151;
  margin: 0 1rem 1rem;
}
</style>
