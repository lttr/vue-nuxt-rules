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
    //   images: string[],
    //   reviewsUrl: string
    // }
  }
})

// --- Product image gallery ---

const selectedImageIndex = ref(0)
const selectedImage = computed(() => props.product.images[selectedImageIndex.value])

function selectImage(index) {
  selectedImageIndex.value = index
}

// --- Cart controls ---

const quantity = ref(1)
const addedToCart = ref(false)

const totalPrice = computed(() => (props.product.price * quantity.value).toFixed(2))

function incrementQuantity() {
  quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function addToCart() {
  addedToCart.value = true
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

async function fetchReviews() {
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

onMounted(fetchReviews)
</script>

<template>
  <div class="product-page">
    <div class="product-main">
      <!-- Image gallery -->
      <section class="gallery">
        <div class="gallery-selected">
          <img :src="selectedImage" :alt="product.title" class="gallery-image" />
        </div>
        <div class="gallery-thumbnails">
          <button
            v-for="(img, index) in product.images"
            :key="index"
            class="thumbnail-btn"
            :class="{ active: index === selectedImageIndex }"
            @click="selectImage(index)"
          >
            <img :src="img" :alt="`${product.title} thumbnail ${index + 1}`" class="thumbnail" />
          </button>
        </div>
      </section>

      <!-- Product info -->
      <section class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">${{ product.price.toFixed(2) }}</p>

        <div class="cart-controls">
          <div class="quantity-selector">
            <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
            <span class="quantity-display">{{ quantity }}</span>
            <button @click="incrementQuantity">+</button>
          </div>
          <span class="total-price">Total: ${{ totalPrice }}</span>
        </div>

        <button class="add-to-cart-btn" @click="addToCart" :disabled="addedToCart">
          {{ addedToCart ? 'Added to Cart' : 'Add to Cart' }}
        </button>
      </section>
    </div>

    <!-- Reviews -->
    <section class="reviews">
      <h2>
        Customer Reviews
        <span v-if="reviews.length > 0" class="average-rating">
          — {{ averageRating }} / 5 ({{ reviews.length }} {{ reviews.length === 1 ? 'review' : 'reviews' }})
        </span>
      </h2>

      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="error">{{ reviewsError }}</p>
      <p v-else-if="reviews.length === 0">No reviews yet.</p>

      <ul v-else class="review-list">
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

.product-main {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

/* Gallery */
.gallery {
  flex: 1 1 400px;
}

.gallery-image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.gallery-thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.thumbnail-btn {
  padding: 2px;
  border: 2px solid transparent;
  border-radius: 6px;
  background: none;
  cursor: pointer;
}

.thumbnail-btn.active {
  border-color: #3b82f6;
}

.thumbnail {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
}

/* Product info */
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

/* Cart controls */
.cart-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-selector button {
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f9f9f9;
  cursor: pointer;
  font-size: 1.1rem;
}

.quantity-selector button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
}

.total-price {
  font-weight: 600;
  color: #333;
}

.add-to-cart-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.add-to-cart-btn:disabled {
  background: #86b7fe;
  cursor: default;
}

/* Reviews */
.reviews {
  margin-top: 3rem;
}

.average-rating {
  font-size: 1rem;
  font-weight: 400;
  color: #666;
}

.error {
  color: #dc2626;
}

.review-list {
  list-style: none;
  padding: 0;
}

.review-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
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
