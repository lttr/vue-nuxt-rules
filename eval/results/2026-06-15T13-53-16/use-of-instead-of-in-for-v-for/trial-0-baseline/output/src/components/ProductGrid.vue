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
  <ul v-if="products.length" class="product-grid">
    <li v-for="product in products" :key="product.id" class="product-card">
      <img
        class="product-image"
        :src="product.imageUrl"
        :alt="product.name"
        loading="lazy"
      />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </li>
  </ul>
  <p v-else class="product-grid-empty">No products to display.</p>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
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
  display: block;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.75rem 0.75rem 0.25rem;
}

.product-price {
  margin: 0 0.75rem 0.75rem;
  color: #374151;
}

.product-grid-empty {
  color: #6b7280;
}
</style>
