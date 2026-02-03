<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // Expected shape:
    // {
    //   title: string,
    //   description: string,
    //   price: number,
    //   images: string[],       // array of image URLs
    //   stock: number,
    //   reviewsUrl: string      // endpoint to fetch reviews
    // }
  }
})

// ── State variables (8 total) ──────────────────────────────────

const selectedImageIndex = ref(0)
const quantity = ref(1)
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)
const addedToCart = ref(false)
const reviewSortOrder = ref('newest')   // 'newest' | 'oldest' | 'highest' | 'lowest'
const showFullDescription = ref(false)

// ── Derived values (5 total) ───────────────────────────────────

const selectedImage = computed(() => {
  return props.product.images?.[selectedImageIndex.value] ?? null
})

const totalPrice = computed(() => {
  return (props.product.price * quantity.value).toFixed(2)
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const sortedReviews = computed(() => {
  const copy = [...reviews.value]
  switch (reviewSortOrder.value) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.date) - new Date(a.date))
    case 'oldest':
      return copy.sort((a, b) => new Date(a.date) - new Date(b.date))
    case 'highest':
      return copy.sort((a, b) => b.rating - a.rating)
    case 'lowest':
      return copy.sort((a, b) => a.rating - b.rating)
    default:
      return copy
  }
})

const isOutOfStock = computed(() => {
  return props.product.stock <= 0
})

// ── Methods ────────────────────────────────────────────────────

function selectImage(index) {
  selectedImageIndex.value = index
}

function incrementQuantity() {
  if (quantity.value < props.product.stock) {
    quantity.value++
  }
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function addToCart() {
  if (isOutOfStock.value) return
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}

async function fetchReviews() {
  if (!props.product.reviewsUrl) return
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.product.reviewsUrl)
    if (!response.ok) throw new Error(`Failed to load reviews (${response.status})`)
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = err.message
  } finally {
    reviewsLoading.value = false
  }
}

function renderStars(rating) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '\u2605'.repeat(full) + (half ? '\u00BD' : '') + '\u2606'.repeat(empty)
}

// ── Lifecycle ──────────────────────────────────────────────────

onMounted(() => {
  fetchReviews()
})
</script>

<template>
  <div class="product-page">
    <!-- Top section: gallery + info side-by-side -->
    <div class="product-top">
      <!-- Image Gallery -->
      <div class="gallery">
        <div class="gallery-main">
          <img
            v-if="selectedImage"
            :src="selectedImage"
            :alt="product.title"
            class="main-image"
          />
          <div v-else class="no-image">No image available</div>
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

        <div class="product-rating" v-if="reviews.length > 0">
          <span class="stars">{{ renderStars(Number(averageRating)) }}</span>
          <span class="rating-count">{{ averageRating }} ({{ reviews.length }} reviews)</span>
        </div>

        <p class="product-price">${{ product.price.toFixed(2) }}</p>

        <div class="product-description">
          <p v-if="showFullDescription || product.description.length <= 200">
            {{ product.description }}
          </p>
          <p v-else>
            {{ product.description.slice(0, 200) }}&hellip;
          </p>
          <button
            v-if="product.description.length > 200"
            class="toggle-description"
            @click="showFullDescription = !showFullDescription"
          >
            {{ showFullDescription ? 'Show less' : 'Read more' }}
          </button>
        </div>

        <div class="stock-status">
          <span v-if="isOutOfStock" class="out-of-stock">Out of stock</span>
          <span v-else-if="product.stock <= 5" class="low-stock">
            Only {{ product.stock }} left in stock
          </span>
          <span v-else class="in-stock">In stock</span>
        </div>

        <!-- Quantity Selector + Add to Cart -->
        <div class="purchase-controls">
          <div class="quantity-selector">
            <button @click="decrementQuantity" :disabled="quantity <= 1">-</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button @click="incrementQuantity" :disabled="quantity >= product.stock">+</button>
          </div>

          <p class="total-price">Total: ${{ totalPrice }}</p>

          <button
            class="add-to-cart"
            :class="{ added: addedToCart }"
            :disabled="isOutOfStock"
            @click="addToCart"
          >
            {{ addedToCart ? 'Added!' : isOutOfStock ? 'Out of Stock' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="reviews-section">
      <h2>Customer Reviews</h2>

      <div v-if="reviewsLoading" class="reviews-loading">Loading reviews&hellip;</div>

      <div v-else-if="reviewsError" class="reviews-error">
        <p>{{ reviewsError }}</p>
        <button @click="fetchReviews">Retry</button>
      </div>

      <div v-else-if="reviews.length === 0" class="reviews-empty">
        No reviews yet.
      </div>

      <template v-else>
        <div class="reviews-header">
          <span>{{ reviews.length }} reviews &mdash; {{ averageRating }} average</span>
          <select v-model="reviewSortOrder">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </div>

        <ul class="reviews-list">
          <li v-for="review in sortedReviews" :key="review.id" class="review-item">
            <div class="review-meta">
              <span class="review-stars">{{ renderStars(review.rating) }}</span>
              <strong>{{ review.author }}</strong>
              <time :datetime="review.date">{{ new Date(review.date).toLocaleDateString() }}</time>
            </div>
            <p class="review-body">{{ review.body }}</p>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
}

/* ── Top layout ─────────────────────────────── */

.product-top {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

/* ── Gallery ────────────────────────────────── */

.gallery {
  flex: 1 1 50%;
  min-width: 0;
}

.gallery-main {
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.no-image {
  color: #999;
}

.gallery-thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  overflow-x: auto;
}

.thumbnail {
  flex: 0 0 64px;
  height: 64px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.thumbnail.active {
  border-color: #111;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Product Info ───────────────────────────── */

.product-info {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-title {
  font-size: 1.75rem;
  margin: 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.stars {
  color: #f59e0b;
}

.rating-count {
  color: #666;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.product-description {
  line-height: 1.6;
  color: #444;
}

.product-description p {
  margin: 0;
}

.toggle-description {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.stock-status .in-stock { color: #16a34a; }
.stock-status .low-stock { color: #d97706; }
.stock-status .out-of-stock { color: #dc2626; font-weight: 600; }

/* ── Purchase Controls ──────────────────────── */

.purchase-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
  width: fit-content;
}

.quantity-selector button {
  width: 36px;
  height: 36px;
  font-size: 1.1rem;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
}

.quantity-selector button:disabled {
  opacity: 0.4;
  cursor: default;
}

.quantity-value {
  width: 48px;
  text-align: center;
  font-weight: 600;
}

.total-price {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.add-to-cart {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #111;
  color: #fff;
  transition: background 0.2s;
  width: fit-content;
}

.add-to-cart:hover:not(:disabled) {
  background: #333;
}

.add-to-cart:disabled {
  background: #999;
  cursor: default;
}

.add-to-cart.added {
  background: #16a34a;
}

/* ── Reviews ────────────────────────────────── */

.reviews-section {
  border-top: 1px solid #e5e5e5;
  padding-top: 2rem;
}

.reviews-section h2 {
  margin: 0 0 1rem;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #555;
}

.reviews-header select {
  padding: 0.35rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}

.reviews-loading,
.reviews-empty {
  color: #888;
  padding: 1rem 0;
}

.reviews-error {
  color: #dc2626;
}

.reviews-error button {
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  border: 1px solid #dc2626;
  background: none;
  color: #dc2626;
  border-radius: 4px;
  cursor: pointer;
}

.reviews-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.review-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 1.25rem;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.review-stars {
  color: #f59e0b;
}

.review-meta time {
  color: #999;
  margin-left: auto;
}

.review-body {
  margin: 0;
  line-height: 1.5;
  color: #333;
}

/* ── Responsive ─────────────────────────────── */

@media (max-width: 768px) {
  .product-top {
    flex-direction: column;
  }
}
</style>
