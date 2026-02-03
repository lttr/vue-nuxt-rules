<script setup>
import { ref, computed, onMounted } from 'vue'

// ── Product Info ──────────────────────────────────────────────
const product = ref({
  title: 'Premium Wireless Headphones',
  description:
    'Experience crystal-clear audio with active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions.',
  price: 149.99,
  images: [
    '/images/headphones-front.jpg',
    '/images/headphones-side.jpg',
    '/images/headphones-back.jpg',
    '/images/headphones-case.jpg',
  ],
})

const selectedImageIndex = ref(0)

const selectedImage = computed(() => product.value.images[selectedImageIndex.value])

function selectImage(index) {
  selectedImageIndex.value = index
}

// ── Cart ──────────────────────────────────────────────────────
const quantity = ref(1)
const addedToCart = ref(false)

const totalPrice = computed(() => (product.value.price * quantity.value).toFixed(2))

function incrementQuantity() {
  quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}

// ── Reviews ───────────────────────────────────────────────────
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
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to load reviews (${res.status})`)
    reviews.value = await res.json()
  } catch (err) {
    reviewsError.value = err.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(() => {
  fetchReviews('/api/reviews')
})
</script>

<template>
  <div class="product-page">
    <!-- Product Header -->
    <section class="product-main">
      <!-- Image Gallery -->
      <div class="gallery">
        <div class="gallery-selected">
          <img :src="selectedImage" :alt="product.title" class="gallery-image" />
        </div>
        <div class="gallery-thumbnails">
          <button
            v-for="(img, index) in product.images"
            :key="index"
            :class="['thumbnail', { active: index === selectedImageIndex }]"
            @click="selectImage(index)"
          >
            <img :src="img" :alt="`${product.title} thumbnail ${index + 1}`" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">${{ product.price }}</p>

        <!-- Quantity + Add to Cart -->
        <div class="cart-controls">
          <div class="quantity-selector">
            <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button @click="incrementQuantity">+</button>
          </div>
          <button class="add-to-cart" @click="addToCart">
            {{ addedToCart ? 'Added!' : 'Add to Cart' }}
          </button>
        </div>
        <p class="total-price">Total: ${{ totalPrice }}</p>
      </div>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <h2>
        Customer Reviews
        <span v-if="reviews.length" class="average-rating">
          — {{ averageRating }} / 5 ({{ reviews.length }}
          {{ reviews.length === 1 ? 'review' : 'reviews' }})
        </span>
      </h2>

      <p v-if="reviewsLoading" class="reviews-status">Loading reviews…</p>
      <p v-else-if="reviewsError" class="reviews-status error">{{ reviewsError }}</p>
      <p v-else-if="reviews.length === 0" class="reviews-status">No reviews yet.</p>

      <ul v-else class="reviews-list">
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <strong>{{ review.author }}</strong>
            <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
          </div>
          <p>{{ review.body }}</p>
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

/* ── Layout ─────────────────────────────────── */
.product-main {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

/* ── Gallery ────────────────────────────────── */
.gallery {
  flex: 1 1 400px;
}

.gallery-image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  aspect-ratio: 1;
  background: #f0f0f0;
}

.gallery-thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.thumbnail {
  width: 64px;
  height: 64px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  background: #f0f0f0;
}

.thumbnail.active {
  border-color: #2563eb;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Product Info ───────────────────────────── */
.product-info {
  flex: 1 1 300px;
}

.product-title {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
}

.product-description {
  color: #555;
  line-height: 1.6;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1rem 0;
}

/* ── Cart Controls ──────────────────────────── */
.cart-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
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
  background: #f5f5f5;
  font-size: 1.1rem;
  cursor: pointer;
}

.quantity-selector button:disabled {
  opacity: 0.4;
  cursor: default;
}

.quantity-value {
  width: 40px;
  text-align: center;
  font-weight: 600;
}

.add-to-cart {
  padding: 0.6rem 1.5rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart:hover {
  background: #1d4ed8;
}

.total-price {
  margin-top: 0.75rem;
  font-weight: 600;
  color: #333;
}

/* ── Reviews ────────────────────────────────── */
.reviews {
  margin-top: 3rem;
  border-top: 1px solid #e5e5e5;
  padding-top: 2rem;
}

.reviews h2 {
  font-size: 1.25rem;
}

.average-rating {
  font-weight: 400;
  color: #666;
  font-size: 1rem;
}

.reviews-status {
  color: #888;
}

.reviews-status.error {
  color: #dc2626;
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
  margin-bottom: 0.25rem;
}

.review-rating {
  color: #f59e0b;
}
</style>
