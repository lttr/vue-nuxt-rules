<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// ── Props ──
const props = defineProps({
  product: {
    type: Object,
    required: true,
    // Expected shape:
    // {
    //   id: number,
    //   title: string,
    //   description: string,
    //   price: number,
    //   images: string[],       // URLs; first is the hero image
    //   maxQuantity: number,
    //   reviewsUrl: string,     // endpoint that returns { reviews: Review[] }
    // }
  },
})

const emit = defineEmits(['add-to-cart'])

// ── State variables (6+) ──
const selectedImageIndex = ref(0)           // 1. which gallery image is active
const quantity = ref(1)                     // 2. quantity chosen by user
const reviews = ref([])                     // 3. reviews fetched from URL
const reviewsLoading = ref(false)           // 4. loading flag for reviews
const reviewsError = ref(null)              // 5. error message for reviews fetch
const addedToCart = ref(false)              // 6. brief confirmation after add-to-cart
const reviewSortOrder = ref('newest')       // 7. sort order for reviews
const showFullDescription = ref(false)      // 8. toggle long descriptions

// ── Derived values (3+) ──
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
  if (reviewSortOrder.value === 'newest') {
    return copy.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  if (reviewSortOrder.value === 'oldest') {
    return copy.sort((a, b) => new Date(a.date) - new Date(b.date))
  }
  if (reviewSortOrder.value === 'highest') {
    return copy.sort((a, b) => b.rating - a.rating)
  }
  return copy.sort((a, b) => a.rating - b.rating)
})

const selectedImage = computed(() => {
  return props.product.images[selectedImageIndex.value]
})

// ── Helpers ──
function selectImage(index) {
  selectedImageIndex.value = index
}

function incrementQty() {
  if (quantity.value < props.product.maxQuantity) {
    quantity.value++
  }
}

function decrementQty() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function handleAddToCart() {
  emit('add-to-cart', {
    productId: props.product.id,
    quantity: quantity.value,
    totalPrice: totalPrice.value,
  })
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
    const res = await fetch(props.product.reviewsUrl)
    if (!res.ok) throw new Error(`Failed to load reviews (${res.status})`)
    const data = await res.json()
    reviews.value = data.reviews ?? []
  } catch (err) {
    reviewsError.value = err.message
  } finally {
    reviewsLoading.value = false
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function starDisplay(rating) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

// ── Lifecycle ──
onMounted(fetchReviews)

watch(() => props.product.reviewsUrl, fetchReviews)
</script>

<template>
  <div class="product-page">
    <!-- ─── Top: Image Gallery + Product Info ─── -->
    <div class="product-top">
      <!-- Image Gallery -->
      <div class="gallery">
        <div class="gallery-main">
          <img
            :src="selectedImage"
            :alt="product.title"
            class="gallery-main-img"
          />
        </div>
        <div class="gallery-thumbs">
          <button
            v-for="(img, idx) in product.images"
            :key="idx"
            class="thumb-btn"
            :class="{ 'thumb-active': idx === selectedImageIndex }"
            @click="selectImage(idx)"
          >
            <img :src="img" :alt="`${product.title} thumbnail ${idx + 1}`" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>

        <div class="product-rating" v-if="reviews.length > 0">
          <span class="stars">{{ starDisplay(Number(averageRating)) }}</span>
          <span class="rating-text">
            {{ averageRating }} out of 5 ({{ reviews.length }}
            {{ reviews.length === 1 ? 'review' : 'reviews' }})
          </span>
        </div>

        <p class="product-price">${{ product.price.toFixed(2) }}</p>

        <div class="product-description">
          <p v-if="!showFullDescription && product.description.length > 200">
            {{ product.description.slice(0, 200) }}&hellip;
            <button class="link-btn" @click="showFullDescription = true">
              Read more
            </button>
          </p>
          <p v-else>
            {{ product.description }}
            <button
              v-if="product.description.length > 200"
              class="link-btn"
              @click="showFullDescription = false"
            >
              Show less
            </button>
          </p>
        </div>

        <!-- Quantity + Add to Cart -->
        <div class="purchase-controls">
          <div class="qty-selector">
            <button
              class="qty-btn"
              :disabled="quantity <= 1"
              @click="decrementQty"
            >
              &minus;
            </button>
            <span class="qty-value">{{ quantity }}</span>
            <button
              class="qty-btn"
              :disabled="quantity >= product.maxQuantity"
              @click="incrementQty"
            >
              +
            </button>
          </div>

          <button class="add-to-cart-btn" @click="handleAddToCart">
            Add to Cart &mdash; ${{ totalPrice }}
          </button>
        </div>

        <transition name="fade">
          <p v-if="addedToCart" class="cart-confirmation">
            Added to cart!
          </p>
        </transition>
      </div>
    </div>

    <!-- ─── Reviews Section ─── -->
    <div class="reviews-section">
      <h2 class="reviews-heading">Customer Reviews</h2>

      <div v-if="reviewsLoading" class="reviews-loading">
        Loading reviews&hellip;
      </div>

      <div v-else-if="reviewsError" class="reviews-error">
        {{ reviewsError }}
        <button class="link-btn" @click="fetchReviews">Retry</button>
      </div>

      <template v-else>
        <div v-if="reviews.length === 0" class="reviews-empty">
          No reviews yet.
        </div>

        <template v-else>
          <div class="reviews-toolbar">
            <label for="sort-select">Sort by:</label>
            <select id="sort-select" v-model="reviewSortOrder">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>

          <ul class="reviews-list">
            <li
              v-for="review in sortedReviews"
              :key="review.id"
              class="review-card"
            >
              <div class="review-header">
                <span class="review-author">{{ review.author }}</span>
                <span class="review-date">{{ formatDate(review.date) }}</span>
              </div>
              <div class="review-stars">{{ starDisplay(review.rating) }}</div>
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
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
}

/* ── Top layout ── */
.product-top {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}

/* ── Gallery ── */
.gallery {
  flex: 1 1 400px;
  min-width: 280px;
}

.gallery-main {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.gallery-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-thumbs {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  overflow-x: auto;
}

.thumb-btn {
  flex: 0 0 64px;
  height: 64px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumb-active {
  border-color: #2563eb;
}

/* ── Product Info ── */
.product-info {
  flex: 1 1 380px;
  min-width: 260px;
}

.product-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.stars {
  color: #f59e0b;
  font-size: 1.1rem;
}

.rating-text {
  font-size: 0.9rem;
  color: #555;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0 1rem;
}

.product-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #333;
}

.link-btn {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  text-decoration: underline;
}

/* ── Purchase controls ── */
.purchase-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.qty-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f3f4f6;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-value {
  width: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
}

.add-to-cart-btn {
  padding: 0.65rem 1.5rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.add-to-cart-btn:hover {
  background: #1d4ed8;
}

.cart-confirmation {
  margin-top: 0.75rem;
  color: #16a34a;
  font-weight: 600;
}

/* ── Reviews ── */
.reviews-section {
  margin-top: 3rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
}

.reviews-heading {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.reviews-loading,
.reviews-error,
.reviews-empty {
  padding: 1rem 0;
  color: #666;
}

.reviews-error {
  color: #dc2626;
}

.reviews-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.reviews-toolbar select {
  padding: 0.3rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.9rem;
}

.reviews-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem 1.25rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.review-author {
  font-weight: 600;
}

.review-date {
  font-size: 0.85rem;
  color: #888;
}

.review-stars {
  color: #f59e0b;
  margin-bottom: 0.5rem;
}

.review-body {
  margin: 0;
  line-height: 1.55;
  color: #333;
}

/* ── Transitions ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
