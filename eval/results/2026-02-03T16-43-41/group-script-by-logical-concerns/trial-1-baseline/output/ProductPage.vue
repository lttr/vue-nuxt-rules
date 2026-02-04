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

// State variables
const selectedImageIndex = ref(0)
const quantity = ref(1)
const reviews = ref([])
const isLoadingReviews = ref(false)
const reviewsError = ref(null)
const isAddingToCart = ref(false)

// Derived values
const selectedImage = computed(() => {
  return props.product.images?.[selectedImageIndex.value] || null
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const totalPrice = computed(() => {
  return (props.product.price * quantity.value).toFixed(2)
})

// Methods
function selectImage(index) {
  selectedImageIndex.value = index
}

function incrementQuantity() {
  quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

async function addToCart() {
  isAddingToCart.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    alert(`Added ${quantity.value} item(s) to cart!`)
  } finally {
    isAddingToCart.value = false
  }
}

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
    <div class="product-main">
      <!-- Image Gallery -->
      <div class="image-gallery">
        <div class="main-image">
          <img
            v-if="selectedImage"
            :src="selectedImage.url"
            :alt="selectedImage.alt || product.title"
          />
          <div v-else class="no-image">No image available</div>
        </div>
        <div class="thumbnails">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            class="thumbnail"
            :class="{ active: index === selectedImageIndex }"
            @click="selectImage(index)"
          >
            <img :src="image.url" :alt="image.alt || `Thumbnail ${index + 1}`" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">${{ product.price }}</div>

        <!-- Quantity Selector -->
        <div class="quantity-selector">
          <label>Quantity:</label>
          <div class="quantity-controls">
            <button @click="decrementQuantity" :disabled="quantity <= 1">-</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button @click="incrementQuantity">+</button>
          </div>
        </div>

        <!-- Total Price -->
        <div class="total-price">
          Total: <strong>${{ totalPrice }}</strong>
        </div>

        <!-- Add to Cart Button -->
        <button
          class="add-to-cart-btn"
          @click="addToCart"
          :disabled="isAddingToCart"
        >
          {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
        </button>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="reviews-section">
      <h2>Customer Reviews</h2>

      <div v-if="reviews.length > 0" class="reviews-summary">
        <span class="average-rating">{{ averageRating }} / 5</span>
        <span class="reviews-count">({{ reviews.length }} reviews)</span>
      </div>

      <div v-if="isLoadingReviews" class="reviews-loading">
        Loading reviews...
      </div>

      <div v-else-if="reviewsError" class="reviews-error">
        {{ reviewsError }}
        <button @click="loadReviews">Retry</button>
      </div>

      <div v-else-if="reviews.length === 0" class="no-reviews">
        No reviews yet.
      </div>

      <ul v-else class="reviews-list">
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <span class="review-author">{{ review.author }}</span>
            <span class="review-rating">{{ review.rating }} / 5</span>
          </div>
          <p class="review-text">{{ review.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image {
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}

.thumbnails {
  display: flex;
  gap: 8px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.thumbnail.active {
  border-color: #333;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-title {
  margin: 0;
  font-size: 28px;
}

.product-description {
  color: #666;
  line-height: 1.6;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-value {
  min-width: 40px;
  text-align: center;
  font-size: 18px;
}

.total-price {
  font-size: 18px;
}

.add-to-cart-btn {
  padding: 16px 32px;
  font-size: 18px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #3aa876;
}

.add-to-cart-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.reviews-section {
  border-top: 1px solid #eee;
  padding-top: 40px;
}

.reviews-section h2 {
  margin: 0 0 20px;
}

.reviews-summary {
  margin-bottom: 20px;
}

.average-rating {
  font-size: 24px;
  font-weight: bold;
}

.reviews-count {
  color: #666;
  margin-left: 8px;
}

.reviews-loading,
.reviews-error,
.no-reviews {
  padding: 20px;
  text-align: center;
  color: #666;
}

.reviews-error button {
  margin-left: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

.reviews-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
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
  line-height: 1.5;
}

@media (max-width: 768px) {
  .product-main {
    grid-template-columns: 1fr;
  }
}
</style>
