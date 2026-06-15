<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const priceFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
})

function formatPrice(price) {
  return priceFormatter.format(price)
}
</script>

<template>
  <ul class="product-grid">
    <li v-for="product of products" :key="product.id" class="product-card">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </li>
  </ul>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
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
  margin: 0.75rem 0.75rem 0.25rem;
  font-size: 1rem;
  font-weight: 600;
}

.product-price {
  margin: 0 0.75rem 0.75rem;
  color: #2c7a2c;
  font-weight: 500;
}
</style>
