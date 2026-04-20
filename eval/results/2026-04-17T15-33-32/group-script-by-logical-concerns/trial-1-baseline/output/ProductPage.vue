<template>
  <div class="product-page">
    <section class="product-header">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ formattedPrice }}</p>
    </section>

    <section class="image-gallery">
      <div class="main-image">
        <img :src="selectedImage" :alt="product.title" />
      </div>
      <div class="thumbnails">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          :alt="`${product.title} thumbnail ${index + 1}`"
          :class="['thumbnail', { active: index === selectedImageIndex }]"
          @click="selectImage(index)"
        />
      </div>
    </section>

    <section class="purchase">
      <label for="quantity">Quantity:</label>
      <div class="quantity-selector">
        <button :disabled="quantity <= 1" @click="decrementQuantity">-</button>
        <input
          id="quantity"
          type="number"
          min="1"
          :max="product.stock"
          v-model.number="quantity"
        />
        <button :disabled="quantity >= product.stock" @click="incrementQuantity">+</button>
      </div>
      <p class="total">Total: {{ formattedTotal }}</p>
      <button
        class="add-to-cart"
        :disabled="!canAddToCart"
        @click="addToCart"
      >
        {{ addToCartLabel }}
      </button>
    </section>

    <section class="reviews">
      <h2>Reviews</h2>
      <p v-if="reviewsLoading">Loading reviews...</p>
      <p v-else-if="reviewsError" class="error">
        Failed to load reviews: {{ reviewsError }}
      </p>
      <template v-else>
        <p class="average-rating">
          Average rating: {{ averageRating }} ({{ reviews.length }} reviews)
        </p>
        <ul class="review-list">
          <li v-for="review in reviews" :key="review.id" class="review">
            <strong>{{ review.author }}</strong>
            <span class="stars">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
            <p>{{ review.body }}</p>
          </li>
        </ul>
      </template>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (p) =>
      p &&
      typeof p.title === 'string' &&
      Array.isArray(p.images) &&
      typeof p.price === 'number'
  },
  reviewsUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

// State variables (6)
const selectedImageIndex = ref(0)
const quantity = ref(1)
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)
const addedToCart = ref(false)

// Derived values (3)
const selectedImage = computed(
  () => props.product.images[selectedImageIndex.value] ?? ''
)

const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(props.product.price)
)

const formattedTotal = computed(() =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(props.product.price * quantity.value)
)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return '0.0'
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const canAddToCart = computed(
  () => props.product.stock > 0 && quantity.value > 0 && quantity.value <= props.product.stock
)

const addToCartLabel = computed(() => {
  if (props.product.stock === 0) return 'Out of stock'
  if (addedToCart.value) return 'Added!'
  return 'Add to cart'
})

function selectImage(index) {
  selectedImageIndex.value = index
}

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
    quantity: quantity.value
  })
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 1500)
}

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = err.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(loadReviews)
</script>

<style scoped>
.product-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.product-title {
  font-size: 2rem;
  margin: 0 0 0.5rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2a7;
}

.image-gallery {
  margin: 1.5rem 0;
}

.main-image img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  border: 1px solid #e4e4e4;
  border-radius: 6px;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.thumbnail {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}

.thumbnail.active {
  border-color: #2a7;
}

.purchase {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 6px;
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.quantity-selector input {
  width: 4rem;
  text-align: center;
}

.add-to-cart {
  padding: 0.6rem 1.2rem;
  background: #2a7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.add-to-cart:disabled {
  background: #999;
  cursor: not-allowed;
}

.reviews {
  margin-top: 2rem;
}

.review {
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.stars {
  margin-left: 0.5rem;
  color: #f5a623;
}

.error {
  color: #c33;
}
</style>
