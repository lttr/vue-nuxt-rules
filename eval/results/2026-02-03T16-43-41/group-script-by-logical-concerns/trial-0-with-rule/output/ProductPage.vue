<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  reviewsUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

// Image Gallery State
const selectedImageIndex = ref(0)
const selectedImage = computed(() => props.product.images?.[selectedImageIndex.value] || '')

function selectImage(index) {
  selectedImageIndex.value = index
}

// Cart State
const quantity = ref(1)
const maxQuantity = ref(10)
const isAddingToCart = ref(false)

const canAddToCart = computed(() =>
  quantity.value > 0 &&
  quantity.value <= maxQuantity.value &&
  !isAddingToCart.value
)

function incrementQuantity() {
  if (quantity.value < maxQuantity.value) {
    quantity.value++
  }
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

async function addToCart() {
  if (!canAddToCart.value) return

  isAddingToCart.value = true
  try {
    emit('add-to-cart', {
      productId: props.product.id,
      quantity: quantity.value
    })
  } finally {
    isAddingToCart.value = false
  }
}

// Reviews State
const reviews = ref([])
const isLoadingReviews = ref(false)
const reviewsError = ref(null)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

async function loadReviews() {
  isLoadingReviews.value = true
  reviewsError.value = null

  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) {
      throw new Error('Failed to load reviews')
    }
    reviews.value = await response.json()
  } catch (error) {
    reviewsError.value = error.message
  } finally {
    isLoadingReviews.value = false
  }
}

onMounted(() => {
  loadReviews()
})
</script>

<template>
  <div class="product-page">
    <!-- Product Info Section -->
    <section class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">${{ product.price?.toFixed(2) }}</p>
    </section>

    <!-- Image Gallery Section -->
    <section class="image-gallery">
      <div class="main-image">
        <img :src="selectedImage" :alt="product.title" />
      </div>
      <div class="thumbnails">
        <button
          v-for="(image, index) in product.images"
          :key="index"
          :class="['thumbnail', { active: index === selectedImageIndex }]"
          @click="selectImage(index)"
        >
          <img :src="image" :alt="`${product.title} thumbnail ${index + 1}`" />
        </button>
      </div>
    </section>

    <!-- Add to Cart Section -->
    <section class="add-to-cart">
      <div class="quantity-selector">
        <button
          class="quantity-btn"
          @click="decrementQuantity"
          :disabled="quantity <= 1"
        >
          -
        </button>
        <span class="quantity-display">{{ quantity }}</span>
        <button
          class="quantity-btn"
          @click="incrementQuantity"
          :disabled="quantity >= maxQuantity"
        >
          +
        </button>
      </div>
      <button
        class="add-to-cart-btn"
        :disabled="!canAddToCart"
        @click="addToCart"
      >
        {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
      </button>
    </section>

    <!-- Reviews Section -->
    <section class="reviews">
      <div class="reviews-header">
        <h2>Customer Reviews</h2>
        <div v-if="reviews.length > 0" class="average-rating">
          Average Rating: {{ averageRating }} / 5 ({{ reviews.length }} reviews)
        </div>
      </div>

      <div v-if="isLoadingReviews" class="reviews-loading">
        Loading reviews...
      </div>

      <div v-else-if="reviewsError" class="reviews-error">
        {{ reviewsError }}
        <button @click="loadReviews">Retry</button>
      </div>

      <div v-else-if="reviews.length === 0" class="reviews-empty">
        No reviews yet.
      </div>

      <ul v-else class="reviews-list">
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <span class="review-author">{{ review.author }}</span>
            <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
          </div>
          <p class="review-text">{{ review.text }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.product-info {
  margin-bottom: 2rem;
}

.product-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #666;
  margin-bottom: 1rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.image-gallery {
  margin-bottom: 2rem;
}

.main-image {
  width: 100%;
  max-width: 500px;
  margin-bottom: 1rem;
}

.main-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  background: none;
}

.thumbnail.active {
  border-color: #42b983;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-to-cart {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 1.2rem;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 40px;
  text-align: center;
  font-size: 1.1rem;
}

.add-to-cart-btn {
  padding: 0.75rem 2rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.reviews {
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.reviews-header h2 {
  margin: 0;
}

.average-rating {
  color: #f5a623;
  font-weight: bold;
}

.reviews-loading,
.reviews-error,
.reviews-empty {
  padding: 1rem;
  text-align: center;
  color: #666;
}

.reviews-error button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.reviews-list {
  list-style: none;
  padding: 0;
}

.review-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.review-author {
  font-weight: bold;
}

.review-rating {
  color: #f5a623;
}

.review-text {
  margin: 0;
  color: #444;
}
</style>
