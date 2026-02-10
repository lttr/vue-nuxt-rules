<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card">
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
    validator(value) {
      return value.every(
        (p) =>
          typeof p.id !== 'undefined' &&
          typeof p.name === 'string' &&
          typeof p.price === 'number' &&
          typeof p.imageUrl === 'string'
      );
    },
  },
});

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.product-name {
  margin: 0.75rem 1rem 0.25rem;
  font-size: 1rem;
  font-weight: 600;
}

.product-price {
  margin: 0.25rem 1rem 0.75rem;
  font-size: 1.1rem;
  color: #2a7d2a;
  font-weight: 500;
}
</style>
