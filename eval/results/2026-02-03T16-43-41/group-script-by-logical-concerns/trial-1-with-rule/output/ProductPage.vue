<script setup>
import { ref, computed, onMounted } from 'vue'

// ============================================
// Product Information
// ============================================

const product = ref({
  title: 'Premium Wireless Headphones',
  description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day listening.',
  price: 299.99,
  sku: 'WH-PRO-2024'
})

// ============================================
// Image Gallery
// ============================================

const images = ref([
  { id: 1, url: '/images/headphones-front.jpg', alt: 'Front view' },
  { id: 2, url: '/images/headphones-side.jpg', alt: 'Side view' },
  { id: 3, url: '/images/headphones-back.jpg', alt: 'Back view' },
  { id: 4, url: '/images/headphones-case.jpg', alt: 'With case' }
])

const selectedImageIndex = ref(0)

const selectedImage = computed(() => images.value[selectedImageIndex.value])

function selectImage(index) {
  selectedImageIndex.value = index
}

// ============================================
// Cart / Quantity
// ============================================

const quantity = ref(1)
const isAddingToCart = ref(false)

function incrementQuantity() {
  quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const totalPrice = computed(() => (product.value.price * quantity.value).toFixed(2))

async function addToCart() {
  isAddingToCart.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  alert(`Added ${quantity.value} item(s) to cart. Total: $${totalPrice.value}`)
  isAddingToCart.value = false
}

// ============================================
// Reviews
// ============================================

const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

async function loadReviews(url) {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to load reviews')
    reviews.value = await response.json()
  } catch (error) {
    reviewsError.value = error.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(() => {
  loadReviews('/api/products/reviews')
})
</script>

<template>
  <div class="product-page">
    <!-- Product Header -->
    <section class="product-header">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-sku">SKU: {{ product.sku }}</p>
    </section>

    <div class="product-content">
      <!-- Image Gallery -->
      <section class="image-gallery">
        <div class="main-image">
          <img :src="selectedImage.url" :alt="selectedImage.alt" />
        </div>
        <div class="thumbnails">
          <button
            v-for="(image, index) in images"
            :key="image.id"
            class="thumbnail"
            :class="{ active: index === selectedImageIndex }"
            @click="selectImage(index)"
          >
            <img :src="image.url" :alt="image.alt" />
          </button>
        </div>
      </section>

      <!-- Product Details -->
      <section class="product-details">
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">${{ product.price }}</p>

        <!-- Quantity Selector -->
        <div class="quantity-selector">
          <label>Quantity:</label>
          <div class="quantity-controls">
            <button @click="decrementQuantity" :disabled="quantity <= 1">-</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button @click="incrementQuantity">+</button>
          </div>
        </div>

        <!-- Add to Cart -->
        <div class="cart-section">
          <p class="total-price">Total: ${{ totalPrice }}</p>
          <button
            class="add-to-cart-btn"
            @click="addToCart"
            :disabled="isAddingToCart"
          >
            {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
          </button>
        </div>
      </section>
    </div>

    <!-- Reviews Section -->
    <section class="reviews-section">
      <h2>Customer Reviews</h2>

      <div v-if="reviewsLoading" class="reviews-loading">
        Loading reviews...
      </div>

      <div v-else-if="reviewsError" class="reviews-error">
        {{ reviewsError }}
      </div>

      <div v-else-if="reviews.length > 0" class="reviews-content">
        <p class="average-rating">
          Average Rating: {{ averageRating }} / 5 ({{ reviews.length }} reviews)
        </p>
        <ul class="reviews-list">
          <li v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <span class="review-author">{{ review.author }}</span>
              <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
            </div>
            <p class="review-text">{{ review.text }}</p>
          </li>
        </ul>
      </div>

      <div v-else class="no-reviews">
        No reviews yet.
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.product-header {
  margin-bottom: 2rem;
}

.product-title {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

.product-sku {
  color: #666;
  font-size: 0.875rem;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.image-gallery .main-image {
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.image-gallery .main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
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

.product-description {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.25rem;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-value {
  min-width: 40px;
  text-align: center;
  font-size: 1.125rem;
}

.total-price {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #555;
}

.add-to-cart-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.reviews-section {
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.reviews-section h2 {
  margin-bottom: 1.5rem;
}

.average-rating {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: #666;
}

.reviews-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.review-item {
  padding: 1rem 0;
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
  color: #444;
  line-height: 1.5;
}

.reviews-loading,
.reviews-error,
.no-reviews {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.reviews-error {
  color: #d32f2f;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
  }
}
</style>
