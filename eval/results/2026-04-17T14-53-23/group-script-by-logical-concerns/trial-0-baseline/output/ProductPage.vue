<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // { id, title, description, price, images: [url, ...], stock }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

// --- State variables (6) ---
const selectedImageIndex = ref(0)
const quantity = ref(1)
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)
const cartMessage = ref('')

// --- Derived values (computed) (3+) ---
const selectedImage = computed(
  () => props.product.images?.[selectedImageIndex.value] ?? ''
)

const totalPrice = computed(
  () => (props.product.price * quantity.value).toFixed(2)
)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + (r.rating ?? 0), 0)
  return (sum / reviews.value.length).toFixed(1)
})

const isOutOfStock = computed(() => (props.product.stock ?? 0) <= 0)

// --- Methods ---
function selectThumbnail(index) {
  selectedImageIndex.value = index
}

function increment() {
  if (quantity.value < (props.product.stock ?? Infinity)) {
    quantity.value++
  }
}

function decrement() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  if (isOutOfStock.value) return
  emit('add-to-cart', {
    productId: props.product.id,
    quantity: quantity.value,
    unitPrice: props.product.price,
  })
  cartMessage.value = `Added ${quantity.value} to cart`
  setTimeout(() => (cartMessage.value = ''), 2500)
}

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const res = await fetch(props.reviewsUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    reviews.value = await res.json()
  } catch (err) {
    reviewsError.value = err.message || 'Failed to load reviews'
    reviews.value = []
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(loadReviews)
watch(() => props.reviewsUrl, loadReviews)
</script>

<template>
  <section class="product-page">
    <div class="product-header">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">${{ product.price.toFixed(2) }}</p>
    </div>

    <div class="product-gallery">
      <img
        v-if="selectedImage"
        :src="selectedImage"
        :alt="product.title"
        class="main-image"
      />
      <div class="thumbnails">
        <img
          v-for="(img, i) in product.images"
          :key="i"
          :src="img"
          :alt="`${product.title} thumbnail ${i + 1}`"
          class="thumbnail"
          :class="{ active: i === selectedImageIndex }"
          @click="selectThumbnail(i)"
        />
      </div>
    </div>

    <div class="purchase-controls">
      <div class="quantity-selector">
        <button type="button" @click="decrement" :disabled="quantity <= 1">−</button>
        <span class="quantity-value">{{ quantity }}</span>
        <button
          type="button"
          @click="increment"
          :disabled="quantity >= (product.stock ?? Infinity)"
        >
          +
        </button>
      </div>
      <p class="total-price">Total: ${{ totalPrice }}</p>
      <button
        type="button"
        class="add-to-cart"
        :disabled="isOutOfStock"
        @click="addToCart"
      >
        {{ isOutOfStock ? 'Out of stock' : 'Add to cart' }}
      </button>
      <p v-if="cartMessage" class="cart-message" role="status">{{ cartMessage }}</p>
    </div>

    <section class="reviews">
      <header class="reviews-header">
        <h2>Reviews</h2>
        <span v-if="reviews.length" class="rating-summary">
          ★ {{ averageRating }} ({{ reviews.length }})
        </span>
      </header>

      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="error">Error: {{ reviewsError }}</p>
      <p v-else-if="!reviews.length">No reviews yet.</p>
      <ul v-else class="review-list">
        <li v-for="r in reviews" :key="r.id" class="review-item">
          <div class="review-head">
            <strong>{{ r.author }}</strong>
            <span>★ {{ r.rating }}</span>
          </div>
          <p>{{ r.comment }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.product-page {
  display: grid;
  gap: 1.5rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}
.product-title { margin: 0 0 0.25rem; }
.product-price { font-size: 1.25rem; font-weight: 600; }
.product-gallery { display: grid; gap: 0.5rem; }
.main-image {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 8px;
}
.thumbnails { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.thumbnail {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}
.thumbnail.active { border-color: #0066cc; }
.purchase-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}
.quantity-selector button {
  padding: 0.4rem 0.75rem;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
}
.quantity-selector button:disabled { opacity: 0.5; cursor: not-allowed; }
.quantity-value { padding: 0 0.75rem; min-width: 2ch; text-align: center; }
.add-to-cart {
  padding: 0.6rem 1.2rem;
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
.add-to-cart:disabled { background: #999; cursor: not-allowed; }
.cart-message { color: #0a7a2f; }
.reviews-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.review-list { list-style: none; padding: 0; display: grid; gap: 0.75rem; }
.review-item {
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 0.75rem;
}
.review-head { display: flex; justify-content: space-between; }
.error { color: #b00020; }
</style>
