<script setup>
import { ref, computed, onMounted } from 'vue'

// --- Product Info ---

const product = ref({
  title: 'Wireless Noise-Cancelling Headphones',
  description:
    'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam cushions. Perfect for travel, work, and everyday listening.',
  price: 249.99,
  inStock: true,
})

// --- Image Gallery ---

const images = ref([
  { id: 1, src: '/images/headphones-front.jpg', alt: 'Front view' },
  { id: 2, src: '/images/headphones-side.jpg', alt: 'Side view' },
  { id: 3, src: '/images/headphones-case.jpg', alt: 'With carrying case' },
  { id: 4, src: '/images/headphones-detail.jpg', alt: 'Ear cushion detail' },
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

const totalPrice = computed(() => (product.value.price * quantity.value).toFixed(2))

function incrementQuantity() {
  if (quantity.value < maxQuantity) quantity.value++
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
    <!-- Product Header -->
    <div class="product-layout">
      <!-- Image Gallery -->
      <section class="gallery">
        <div class="gallery-main">
          <img
            :src="selectedImage.src"
            :alt="selectedImage.alt"
            class="main-image"
          />
        </div>
        <div class="gallery-thumbnails">
          <button
            v-for="(image, index) in images"
            :key="image.id"
            class="thumbnail-button"
            :class="{ active: index === selectedImageIndex }"
            @click="selectImage(index)"
          >
            <img :src="image.src" :alt="image.alt" class="thumbnail-image" />
          </button>
        </div>
      </section>

      <!-- Product Info & Cart -->
      <section class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">${{ product.price }}</p>

        <div class="quantity-selector">
          <label for="quantity">Quantity</label>
          <div class="quantity-controls">
            <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button @click="incrementQuantity" :disabled="quantity >= maxQuantity">+</button>
          </div>
        </div>

        <p class="total-price">Total: ${{ totalPrice }}</p>

        <button
          class="add-to-cart-button"
          :disabled="!product.inStock"
          @click="addToCart"
        >
          {{ addedToCart ? 'Added!' : product.inStock ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </section>
    </div>

    <!-- Reviews -->
    <section class="reviews">
      <h2>Customer Reviews</h2>

      <div v-if="reviewsLoading" class="reviews-loading">Loading reviews…</div>

      <div v-else-if="reviewsError" class="reviews-error">
        <p>{{ reviewsError }}</p>
        <button @click="fetchReviews('/api/products/headphones/reviews')">Retry</button>
      </div>

      <template v-else>
        <p v-if="reviews.length" class="reviews-summary">
          {{ averageRating }} / 5 average from {{ reviews.length }} review{{ reviews.length === 1 ? '' : 's' }}
        </p>

        <p v-else class="reviews-empty">No reviews yet.</p>

        <ul class="reviews-list">
          <li v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <span class="review-author">{{ review.author }}</span>
              <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
            </div>
            <p class="review-body">{{ review.body }}</p>
          </li>
        </ul>
      </template>
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

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Gallery */
.gallery-main {
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.main-image {
  width: 100%;
  display: block;
  aspect-ratio: 1;
  object-fit: cover;
}

.gallery-thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.thumbnail-button {
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  background: #f5f5f5;
  flex: 1;
}

.thumbnail-button.active {
  border-color: #333;
}

.thumbnail-image {
  width: 100%;
  display: block;
  aspect-ratio: 1;
  object-fit: cover;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-title {
  font-size: 1.75rem;
  margin: 0;
}

.product-description {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.quantity-selector label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.quantity-controls {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-controls button {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: #f5f5f5;
  font-size: 1.1rem;
  cursor: pointer;
}

.quantity-controls button:disabled {
  opacity: 0.4;
  cursor: default;
}

.quantity-value {
  width: 3rem;
  text-align: center;
  font-weight: 600;
}

.total-price {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.add-to-cart-button {
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: #111;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
}

.add-to-cart-button:hover:not(:disabled) {
  background: #333;
}

.add-to-cart-button:disabled {
  background: #999;
  cursor: default;
}

/* Reviews */
.reviews {
  border-top: 1px solid #e0e0e0;
  padding-top: 2rem;
}

.reviews h2 {
  margin-top: 0;
}

.reviews-summary {
  font-weight: 600;
  margin-bottom: 1rem;
}

.reviews-loading,
.reviews-error,
.reviews-empty {
  color: #777;
}

.reviews-error button {
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
}

.reviews-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.review-item {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 1rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.review-author {
  font-weight: 600;
}

.review-rating {
  color: #f5a623;
}

.review-body {
  margin: 0;
  color: #444;
  line-height: 1.5;
}
</style>
