<script setup>
import { ref, computed, onMounted } from 'vue'

// --- Product Info ---

const product = ref({
  title: 'Wireless Noise-Cancelling Headphones',
  description:
    'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam cushions. Bluetooth 5.2 with multipoint connection.',
  price: 249.99,
  images: [
    '/images/headphones-front.jpg',
    '/images/headphones-side.jpg',
    '/images/headphones-back.jpg',
    '/images/headphones-case.jpg',
  ],
})

// --- Image Gallery ---

const selectedImageIndex = ref(0)

const selectedImage = computed(() => product.value.images[selectedImageIndex.value])

function selectImage(index) {
  selectedImageIndex.value = index
}

// --- Cart ---

const quantity = ref(1)
const addedToCart = ref(false)

const totalPrice = computed(() => (product.value.price * quantity.value).toFixed(2))

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
          <img :src="selectedImage" :alt="product.title" />
        </div>
        <div class="gallery-thumbnails">
          <button
            v-for="(img, index) in product.images"
            :key="index"
            class="thumbnail"
            :class="{ active: index === selectedImageIndex }"
            @click="selectImage(index)"
          >
            <img :src="img" :alt="`${product.title} image ${index + 1}`" />
          </button>
        </div>
      </section>

      <!-- Product Info & Cart -->
      <section class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>

        <div class="cart-controls">
          <div class="quantity-selector">
            <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button @click="incrementQuantity">+</button>
          </div>
          <p class="total">Total: ${{ totalPrice }}</p>
          <button class="add-to-cart" :class="{ added: addedToCart }" @click="addToCart">
            {{ addedToCart ? 'Added!' : 'Add to Cart' }}
          </button>
        </div>
      </section>
    </div>

    <!-- Reviews -->
    <section class="reviews">
      <h2>Customer Reviews</h2>

      <p v-if="reviewsLoading" class="reviews-status">Loading reviews…</p>
      <p v-else-if="reviewsError" class="reviews-status error">{{ reviewsError }}</p>

      <template v-else>
        <p v-if="reviews.length" class="average-rating">
          Average rating: <strong>{{ averageRating }}</strong> / 5
          ({{ reviews.length }} {{ reviews.length === 1 ? 'review' : 'reviews' }})
        </p>

        <ul v-if="reviews.length" class="review-list">
          <li v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <strong>{{ review.author }}</strong>
              <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
            </div>
            <p>{{ review.body }}</p>
          </li>
        </ul>

        <p v-else class="reviews-status">No reviews yet.</p>
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
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.gallery-selected img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.thumbnail.active {
  border-color: #2563eb;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info */
.product-info {
  flex: 1 1 300px;
}

.product-info h1 {
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
}

.description {
  color: #555;
  line-height: 1.6;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1rem 0;
}

/* Cart Controls */
.cart-controls {
  margin-top: 1.5rem;
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
  background: #f9fafb;
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

.total {
  margin: 0.75rem 0;
  font-weight: 600;
}

.add-to-cart {
  padding: 0.75rem 2rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart:hover {
  background: #1d4ed8;
}

.add-to-cart.added {
  background: #16a34a;
}

/* Reviews */
.reviews {
  margin-top: 3rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
}

.reviews h2 {
  margin: 0 0 1rem;
}

.average-rating {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.reviews-status {
  color: #888;
}

.reviews-status.error {
  color: #dc2626;
}

.review-list {
  list-style: none;
  padding: 0;
}

.review-item {
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.review-rating {
  color: #f59e0b;
}
</style>
