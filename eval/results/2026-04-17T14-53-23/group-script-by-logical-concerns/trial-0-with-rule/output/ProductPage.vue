<template>
  <div class="product-page">
    <!-- Product title and description -->
    <section class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ formattedPrice }}</p>
    </section>

    <!-- Image gallery with thumbnails -->
    <section class="product-gallery">
      <div class="main-image">
        <img :src="selectedImage" :alt="product.title" />
      </div>
      <div class="thumbnails">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          :class="{ active: selectedImageIndex === index }"
          :alt="`${product.title} thumbnail ${index + 1}`"
          @click="selectImage(index)"
        />
      </div>
    </section>

    <!-- Add to cart with quantity selector -->
    <section class="product-purchase">
      <div class="quantity-selector">
        <button :disabled="quantity <= 1" @click="decrementQuantity">-</button>
        <input
          v-model.number="quantity"
          type="number"
          min="1"
          :max="product.stock"
        />
        <button :disabled="quantity >= product.stock" @click="incrementQuantity">+</button>
      </div>
      <button
        class="add-to-cart"
        :disabled="!canAddToCart"
        @click="addToCart"
      >
        Add to Cart — {{ formattedTotal }}
      </button>
      <p v-if="cartMessage" class="cart-message">{{ cartMessage }}</p>
    </section>

    <!-- Reviews section -->
    <section class="product-reviews">
      <h2>Reviews <span class="rating">({{ averageRating }} ★)</span></h2>
      <p v-if="isLoadingReviews">Loading reviews…</p>
      <p v-else-if="reviewsError" class="error">{{ reviewsError }}</p>
      <ul v-else class="reviews-list">
        <li v-for="review in reviews" :key="review.id" class="review">
          <div class="review-header">
            <strong>{{ review.author }}</strong>
            <span>{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
          </div>
          <p>{{ review.body }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // Expected shape: { id, title, description, price, images: [], stock }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

// ---- Image gallery ----
const selectedImageIndex = ref(0)
const selectedImage = computed(
  () => props.product.images[selectedImageIndex.value] ?? ''
)
function selectImage(index) {
  selectedImageIndex.value = index
}

// ---- Quantity + add to cart ----
const quantity = ref(1)
const cartMessage = ref('')

const formattedPrice = computed(
  () => `$${props.product.price.toFixed(2)}`
)
const formattedTotal = computed(
  () => `$${(props.product.price * quantity.value).toFixed(2)}`
)
const canAddToCart = computed(
  () => quantity.value > 0 && quantity.value <= props.product.stock
)

function incrementQuantity() {
  if (quantity.value < props.product.stock) quantity.value++
}
function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}
function addToCart() {
  if (!canAddToCart.value) return
  emit('add-to-cart', {
    productId: props.product.id,
    quantity: quantity.value,
  })
  cartMessage.value = `Added ${quantity.value} to cart.`
  setTimeout(() => (cartMessage.value = ''), 2500)
}

// ---- Reviews ----
const reviews = ref([])
const isLoadingReviews = ref(false)
const reviewsError = ref('')

const averageRating = computed(() => {
  if (reviews.value.length === 0) return '0.0'
  const total = reviews.value.reduce((sum, r) => sum + r.rating, 0)
  return (total / reviews.value.length).toFixed(1)
})

async function loadReviews() {
  isLoadingReviews.value = true
  reviewsError.value = ''
  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = `Could not load reviews: ${err.message}`
  } finally {
    isLoadingReviews.value = false
  }
}

onMounted(loadReviews)
</script>

<style scoped>
.product-page {
  display: grid;
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}
.product-title {
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
}
.product-price {
  font-size: 1.25rem;
  font-weight: 600;
}
.product-gallery .main-image img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
}
.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.thumbnails img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border: 2px solid transparent;
  cursor: pointer;
}
.thumbnails img.active {
  border-color: #2563eb;
}
.quantity-selector {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: 1rem;
}
.quantity-selector input {
  width: 3rem;
  text-align: center;
}
.add-to-cart {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  cursor: pointer;
}
.add-to-cart:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
.cart-message {
  color: #16a34a;
  margin-top: 0.5rem;
}
.review {
  border-top: 1px solid #e5e7eb;
  padding: 0.75rem 0;
}
.review-header {
  display: flex;
  justify-content: space-between;
}
.error {
  color: #dc2626;
}
</style>
