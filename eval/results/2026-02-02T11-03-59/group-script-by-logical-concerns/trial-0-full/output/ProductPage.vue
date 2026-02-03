<script setup>
import { ref, computed, onMounted } from 'vue'

// --- Product Info ---

const product = ref({
  title: 'Premium Wireless Headphones',
  description:
    'Experience crystal-clear audio with active noise cancellation, 30-hour battery life, and ultra-comfortable over-ear design. Perfect for music lovers and professionals alike.',
})

// --- Image Gallery ---

const images = ref([
  '/images/headphones-front.jpg',
  '/images/headphones-side.jpg',
  '/images/headphones-detail.jpg',
  '/images/headphones-case.jpg',
])

const selectedImageIndex = ref(0)

const selectedImage = computed(() => images.value[selectedImageIndex.value])

function selectImage(index) {
  selectedImageIndex.value = index
}

// --- Cart / Quantity ---

const quantity = ref(1)
const maxQuantity = 10
const addedToCart = ref(false)

const isQuantityValid = computed(
  () => quantity.value >= 1 && quantity.value <= maxQuantity
)

function incrementQuantity() {
  if (quantity.value < maxQuantity) quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  if (!isQuantityValid.value) return
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}

// --- Reviews ---

const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

async function fetchReviews(url) {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to load reviews (${response.status})`)
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = err.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(() => {
  fetchReviews('/api/products/headphones/reviews')
})
</script>

<template>
  <div class="product-page">
    <div class="product-main">
      <!-- Image Gallery -->
      <section class="gallery">
        <div class="gallery-selected">
          <img :src="selectedImage" :alt="product.title" class="gallery-image" />
        </div>
        <div class="gallery-thumbnails">
          <button
            v-for="(img, index) in images"
            :key="index"
            class="thumbnail-button"
            :class="{ active: index === selectedImageIndex }"
            @click="selectImage(index)"
          >
            <img :src="img" :alt="`${product.title} thumbnail ${index + 1}`" />
          </button>
        </div>
      </section>

      <!-- Product Info & Cart -->
      <section class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-description">{{ product.description }}</p>

        <div v-if="reviews.length > 0" class="rating-summary">
          {{ averageRating }} / 5 ({{ reviews.length }} reviews)
        </div>

        <div class="cart-controls">
          <div class="quantity-selector">
            <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
            <span class="quantity-display">{{ quantity }}</span>
            <button @click="incrementQuantity" :disabled="quantity >= maxQuantity">+</button>
          </div>
          <button
            class="add-to-cart-button"
            :disabled="!isQuantityValid || addedToCart"
            @click="addToCart"
          >
            {{ addedToCart ? 'Added!' : 'Add to Cart' }}
          </button>
        </div>
      </section>
    </div>

    <!-- Reviews -->
    <section class="reviews-section">
      <h2>Customer Reviews</h2>

      <p v-if="reviewsLoading" class="reviews-status">Loading reviews...</p>
      <p v-else-if="reviewsError" class="reviews-status reviews-error">{{ reviewsError }}</p>
      <p v-else-if="reviews.length === 0" class="reviews-status">No reviews yet.</p>

      <ul v-else class="reviews-list">
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <strong>{{ review.author }}</strong>
            <span class="review-rating">{{ review.rating }} / 5</span>
          </div>
          <p class="review-body">{{ review.body }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

.product-main {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

/* Gallery */
.gallery {
  flex: 1 1 400px;
}

.gallery-selected {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: #f5f5f5;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.thumbnail-button {
  width: 64px;
  height: 64px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.thumbnail-button.active {
  border-color: #333;
}

.thumbnail-button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info */
.product-info {
  flex: 1 1 300px;
}

.product-title {
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
}

.product-description {
  color: #555;
  line-height: 1.6;
}

.rating-summary {
  margin: 1rem 0;
  font-weight: 600;
}

/* Cart Controls */
.cart-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-selector button {
  width: 36px;
  height: 36px;
  border: none;
  background: #f0f0f0;
  font-size: 1.1rem;
  cursor: pointer;
}

.quantity-selector button:disabled {
  opacity: 0.4;
  cursor: default;
}

.quantity-display {
  width: 40px;
  text-align: center;
  font-weight: 600;
}

.add-to-cart-button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #111;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.add-to-cart-button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* Reviews */
.reviews-section {
  margin-top: 3rem;
}

.reviews-section h2 {
  margin-bottom: 1rem;
}

.reviews-status {
  color: #777;
}

.reviews-error {
  color: #c00;
}

.reviews-list {
  list-style: none;
  padding: 0;
}

.review-item {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.review-rating {
  color: #666;
}

.review-body {
  margin: 0;
  color: #444;
  line-height: 1.5;
}
</style>
