<template>
  <div class="product-page">
    <section class="gallery">
      <img :src="selectedImage" :alt="product.title" class="gallery-main" />
      <div class="thumbnails">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          :class="['thumbnail', { active: index === selectedImageIndex }]"
          @click="selectedImageIndex = index"
          :alt="`${product.title} thumbnail ${index + 1}`"
        />
      </div>
    </section>

    <section class="details">
      <h1>{{ product.title }}</h1>
      <p class="price">
        {{ formattedPrice }}
        <span v-if="quantity > 1" class="subtotal">({{ formattedSubtotal }} total)</span>
      </p>
      <p class="description">{{ product.description }}</p>

      <div class="purchase-controls">
        <div class="quantity-selector">
          <button @click="decrementQuantity" :disabled="quantity <= 1">-</button>
          <span>{{ quantity }}</span>
          <button @click="incrementQuantity" :disabled="quantity >= product.stock">+</button>
        </div>

        <button
          class="add-to-cart"
          :disabled="!isInStock || addingToCart"
          @click="addToCart"
        >
          {{ addToCartLabel }}
        </button>
      </div>

      <p v-if="!isInStock" class="out-of-stock">Out of stock</p>
    </section>

    <section class="reviews">
      <h2>Reviews ({{ reviews.length }})</h2>
      <p v-if="averageRating" class="average-rating">
        Average rating: {{ averageRating }} / 5
      </p>

      <p v-if="reviewsLoading">Loading reviews...</p>
      <p v-else-if="reviewsError" class="error">{{ reviewsError }}</p>
      <ul v-else class="review-list">
        <li v-for="review in reviews" :key="review.id" class="review">
          <strong>{{ review.author }}</strong>
          <span class="rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
          <p>{{ review.text }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // expected shape: { title, description, price, stock, images: [] }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

// --- state variables (6+) ---
const selectedImageIndex = ref(0)
const quantity = ref(1)
const addingToCart = ref(false)
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)

// --- derived values (3+) ---
const selectedImage = computed(
  () => props.product.images?.[selectedImageIndex.value] ?? ''
)

const isInStock = computed(() => (props.product.stock ?? 0) > 0)

const formattedPrice = computed(() => formatCurrency(props.product.price))

const formattedSubtotal = computed(() =>
  formatCurrency(props.product.price * quantity.value)
)

const averageRating = computed(() => {
  if (!reviews.value.length) return null
  const sum = reviews.value.reduce((total, review) => total + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const addToCartLabel = computed(() => {
  if (!isInStock.value) return 'Out of stock'
  if (addingToCart.value) return 'Adding...'
  return 'Add to Cart'
})

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function incrementQuantity() {
  if (quantity.value < props.product.stock) quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

async function addToCart() {
  addingToCart.value = true
  try {
    emit('add-to-cart', { productId: props.product.id, quantity: quantity.value })
  } finally {
    addingToCart.value = false
  }
}

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) throw new Error(`Failed to load reviews (${response.status})`)
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = err.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(loadReviews)
</script>

<style scoped>
.product-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
}

.gallery {
  grid-column: 1;
}

.gallery-main {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.thumbnail {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  opacity: 0.7;
}

.thumbnail.active {
  border-color: #333;
  opacity: 1;
}

.details {
  grid-column: 2;
}

.price {
  font-size: 1.5rem;
  font-weight: 600;
}

.subtotal {
  font-size: 1rem;
  font-weight: 400;
  color: #666;
}

.purchase-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-selector button {
  width: 2rem;
  height: 2rem;
}

.add-to-cart {
  padding: 0.6rem 1.5rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart:disabled {
  background: #999;
  cursor: not-allowed;
}

.out-of-stock {
  color: #b00020;
}

.reviews {
  grid-column: 1 / -1;
}

.review-list {
  list-style: none;
  padding: 0;
}

.review {
  border-top: 1px solid #eee;
  padding: 0.75rem 0;
}

.rating {
  color: #e8a100;
  margin-left: 0.5rem;
}

.error {
  color: #b00020;
}
</style>
