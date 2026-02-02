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
    //   reviewsUrl: string,     // URL to fetch reviews from
    // }
  },
})

// ---------------------
// State variables (8)
// ---------------------
const selectedImageIndex = ref(0)
const quantity = ref(1)
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)
const addedToCart = ref(false)
const showFullDescription = ref(false)
const reviewSortOrder = ref('newest') // 'newest' | 'oldest' | 'highest' | 'lowest'

// ---------------------
// Derived values (5)
// ---------------------
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

const isOutOfStock = computed(() => {
  return props.product.stock <= 0
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

// ---------------------
// Methods
// ---------------------
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

onMounted(fetchReviews)
</script>

<template>
  <div class="product-page">
    <!-- Product top section -->
    <div class="product-main">
      <!-- Image gallery -->
      <div class="gallery">
        <div class="gallery-selected">
          <img
            v-if="selectedImage"
            :src="selectedImage"
            :alt="product.title"
            class="gallery-image"
          />
          <div v-else class="gallery-placeholder">No image available</div>
        </div>
        <div class="gallery-thumbnails">
          <button
            v-for="(img, index) in product.images"
            :key="index"
            class="thumbnail-btn"
            :class="{ active: index === selectedImageIndex }"
            @click="selectImage(index)"
          >
            <img :src="img" :alt="`${product.title} thumbnail ${index + 1}`" />
          </button>
        </div>
      </div>

      <!-- Product info -->
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
            class="toggle-desc-btn"
            @click="showFullDescription = !showFullDescription"
          >
            {{ showFullDescription ? 'Show less' : 'Read more' }}
          </button>
        </div>

        <div class="product-stock">
          <span v-if="isOutOfStock" class="out-of-stock">Out of stock</span>
          <span v-else class="in-stock">{{ product.stock }} in stock</span>
        </div>

        <!-- Quantity selector + Add to cart -->
        <div class="purchase-controls">
          <div class="quantity-selector">
            <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button @click="incrementQuantity" :disabled="quantity >= product.stock">+</button>
          </div>
          <span class="total-price">Total: ${{ totalPrice }}</span>
        </div>

        <button
          class="add-to-cart-btn"
          :class="{ added: addedToCart }"
          :disabled="isOutOfStock"
          @click="addToCart"
        >
          {{ addedToCart ? 'Added!' : isOutOfStock ? 'Out of stock' : 'Add to cart' }}
        </button>
      </div>
    </div>

    <!-- Reviews section -->
    <div class="reviews-section">
      <h2>Customer Reviews</h2>

      <div v-if="reviewsLoading" class="reviews-loading">Loading reviews&hellip;</div>
      <div v-else-if="reviewsError" class="reviews-error">{{ reviewsError }}</div>
      <template v-else>
        <div v-if="reviews.length === 0" class="reviews-empty">No reviews yet.</div>
        <template v-else>
          <div class="reviews-header">
            <span>{{ reviews.length }} reviews &mdash; average {{ averageRating }}/5</span>
            <select v-model="reviewSortOrder" class="review-sort">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>
          <ul class="reviews-list">
            <li v-for="review in sortedReviews" :key="review.id" class="review-item">
              <div class="review-meta">
                <span class="review-author">{{ review.author }}</span>
                <span class="review-stars">{{ renderStars(review.rating) }}</span>
                <span class="review-date">{{ new Date(review.date).toLocaleDateString() }}</span>
              </div>
              <p class="review-body">{{ review.body }}</p>
            </li>
          </ul>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  font-family: system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
}

/* ---------- Main layout ---------- */
.product-main {
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
}

@media (max-width: 640px) {
  .product-main {
    flex-direction: column;
  }
}

/* ---------- Gallery ---------- */
.gallery {
  flex: 1 1 50%;
  min-width: 0;
}

.gallery-selected {
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.gallery-placeholder {
  color: #999;
}

.gallery-thumbnails {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  overflow-x: auto;
}

.thumbnail-btn {
  flex: 0 0 64px;
  height: 64px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.thumbnail-btn.active {
  border-color: #111;
}

.thumbnail-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---------- Product info ---------- */
.product-info {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-title {
  font-size: 1.5rem;
  margin: 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.stars {
  color: #f59e0b;
}

.rating-count {
  color: #666;
}

.product-price {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
}

.product-description {
  line-height: 1.5;
  color: #444;
}

.product-description p {
  margin: 0;
}

.toggle-desc-btn {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0;
  font-size: 0.85rem;
  margin-top: 4px;
}

.product-stock {
  font-size: 0.9rem;
}

.in-stock {
  color: #16a34a;
}

.out-of-stock {
  color: #dc2626;
  font-weight: 600;
}

/* ---------- Purchase controls ---------- */
.purchase-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-selector button {
  width: 36px;
  height: 36px;
  border: none;
  background: #f3f4f6;
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

.total-price {
  font-weight: 600;
  color: #444;
}

.add-to-cart-btn {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #111;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #333;
}

.add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.add-to-cart-btn.added {
  background: #16a34a;
}

/* ---------- Reviews ---------- */
.reviews-section h2 {
  font-size: 1.25rem;
  margin: 0 0 16px;
}

.reviews-loading,
.reviews-error,
.reviews-empty {
  padding: 16px 0;
  color: #666;
}

.reviews-error {
  color: #dc2626;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #555;
}

.review-sort {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.85rem;
}

.reviews-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-item {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
  font-size: 0.85rem;
}

.review-author {
  font-weight: 600;
}

.review-stars {
  color: #f59e0b;
}

.review-date {
  color: #999;
}

.review-body {
  margin: 0;
  line-height: 1.5;
  color: #333;
}
</style>
