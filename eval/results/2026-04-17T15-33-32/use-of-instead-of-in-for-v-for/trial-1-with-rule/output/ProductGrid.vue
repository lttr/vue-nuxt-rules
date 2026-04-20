<script setup>
defineProps({
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 6px;
}

.product-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.product-price {
  margin: 0;
  color: #111827;
  font-weight: 500;
}
</style>
