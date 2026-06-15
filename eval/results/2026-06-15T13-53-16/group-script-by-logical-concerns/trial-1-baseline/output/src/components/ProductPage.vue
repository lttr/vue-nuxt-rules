<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // shape: { id, title, description, price, images: string[] }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

// --- State (6) ---
const selectedImageIndex = ref(0)   // which gallery image is shown
const quantity = ref(1)             // add-to-cart quantity
const reviews = ref([])             // loaded review list
const reviewsLoading = ref(false)   // reviews fetch in flight
const reviewsError = ref(null)      // reviews fetch error message
const cartMessage = ref('')         // feedback after adding to cart

// --- Derived values (3) ---
const selectedImage = computed(
  () => props.product.images?.[selectedImageIndex.value] ?? ''
)

const totalPrice = computed(
  () => (props.product.price ?? 0) * quantity.value
)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + (r.rating ?? 0), 0)
  return sum / reviews.value.length
})

// --- Actions ---
function selectImage(index) {
  selectedImageIndex.value = index
}

function decrement() {
  if (quantity.value > 1) quantity.value--
}

function increment() {
  quantity.value++
}

function addToCart() {
  cartMessage.value = `Added ${quantity.value} × "${props.product.title}" to cart.`
}

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const res = await fetch(props.reviewsUrl)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    const data = await res.json()
    reviews.value = Array.isArray(data) ? data : (data.reviews ?? [])
  } catch (err) {
    reviewsError.value = err.message || 'Failed to load reviews.'
  } finally {
    reviewsLoading.value = false
  }
}

// Clear the cart confirmation whenever quantity changes again.
watch(quantity, () => {
  cartMessage.value = ''
})

onMounted(loadReviews)
</script>

<template>
  <div class="product-page">
    <!-- Title / description -->
    <section class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
    </section>

    <!-- Image gallery -->
    <section class="gallery">
      <div class="gallery-main">
        <img v-if="selectedImage" :src="selectedImage" :alt="product.title" />
      </div>
      <div class="gallery-thumbs">
        <button
          v-for="(image, index) in product.images"
          :key="index"
          class="thumb"
          :class="{ 'thumb--active': index === selectedImageIndex }"
          type="button"
          @click="selectImage(index)"
        >
          <img :src="image" :alt="`${product.title} thumbnail ${index + 1}`" />
        </button>
      </div>
    </section>

    <!-- Add to cart -->
    <section class="purchase">
      <div class="quantity">
        <button type="button" @click="decrement" :disabled="quantity <= 1">−</button>
        <span class="quantity-value">{{ quantity }}</span>
        <button type="button" @click="increment">+</button>
      </div>
      <button type="button" class="add-to-cart" @click="addToCart">
        Add to cart — {{ totalPrice.toFixed(2) }}
      </button>
      <p v-if="cartMessage" class="cart-message" role="status">{{ cartMessage }}</p>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <header class="reviews-header">
        <h2>Reviews</h2>
        <span v-if="reviews.length" class="reviews-summary">
          {{ averageRating.toFixed(1) }} ★ ({{ reviews.length }})
        </span>
      </header>

      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="reviews-error">{{ reviewsError }}</p>
      <p v-else-if="reviews.length === 0">No reviews yet.</p>

      <ul v-else class="review-list">
        <li v-for="(review, index) in reviews" :key="review.id ?? index" class="review">
          <div class="review-rating">{{ review.rating }} ★</div>
          <p class="review-author">{{ review.author }}</p>
          <p class="review-body">{{ review.body }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  font-family: system-ui, sans-serif;
}

.product-title {
  margin: 0 0 0.5rem;
}

.product-description {
  color: #444;
  line-height: 1.5;
}

.gallery-main img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  border-radius: 8px;
  background: #f5f5f5;
}

.gallery-thumbs {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.thumb {
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  background: none;
  overflow: hidden;
}

.thumb img {
  display: block;
  width: 64px;
  height: 64px;
  object-fit: cover;
}

.thumb--active {
  border-color: #2563eb;
}

.purchase {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.quantity {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.quantity button {
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  background: #f3f4f6;
  cursor: pointer;
  font-size: 1.1rem;
}

.quantity button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity-value {
  min-width: 2.5rem;
  text-align: center;
}

.add-to-cart {
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.add-to-cart:hover {
  background: #1d4ed8;
}

.cart-message {
  color: #15803d;
  margin: 0;
}

.reviews-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.reviews-summary {
  color: #b45309;
  font-weight: 600;
}

.reviews-error {
  color: #b91c1c;
}

.review-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.review {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
}

.review-rating {
  color: #b45309;
  font-weight: 600;
}

.review-author {
  font-weight: 600;
  margin: 0.25rem 0;
}

.review-body {
  margin: 0;
  color: #444;
  line-height: 1.45;
}
</style>
