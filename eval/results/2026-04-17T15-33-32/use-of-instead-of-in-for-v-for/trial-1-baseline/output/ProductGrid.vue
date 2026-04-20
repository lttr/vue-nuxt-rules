<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
    validator: (items) =>
      items.every(
        (p) =>
          p &&
          typeof p.id !== 'undefined' &&
          typeof p.name === 'string' &&
          typeof p.price === 'number' &&
          typeof p.imageUrl === 'string'
      ),
  },
  currency: {
    type: String,
    default: 'USD',
  },
  locale: {
    type: String,
    default: 'en-US',
  },
})

const formatPrice = (price, locale, currency) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
</script>

<template>
  <ul class="product-grid">
    <li v-for="product in products" :key="product.id" class="product-card">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price, locale, currency) }}</p>
    </li>
  </ul>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #fff;
}

.product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}

.product-name {
  margin: 0.75rem 1rem 0.25rem;
  font-size: 1rem;
  font-weight: 600;
}

.product-price {
  margin: 0 1rem 1rem;
  font-size: 0.95rem;
  color: #374151;
}
</style>
