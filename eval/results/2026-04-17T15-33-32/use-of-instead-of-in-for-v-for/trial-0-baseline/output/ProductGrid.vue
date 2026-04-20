<script setup>
const props = defineProps({
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
          typeof p.imageUrl === 'string',
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

const formatPrice = (price) =>
  new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.currency,
  }).format(price)
</script>

<template>
  <ul class="product-grid">
    <li v-for="product in products" :key="product.id" class="product-card">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="product-image"
        loading="lazy"
      />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </li>
  </ul>
</template>

<style scoped>
.product-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background: #fff;
}

.product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.product-price {
  font-size: 0.95rem;
  color: #374151;
  margin: 0;
}
</style>
