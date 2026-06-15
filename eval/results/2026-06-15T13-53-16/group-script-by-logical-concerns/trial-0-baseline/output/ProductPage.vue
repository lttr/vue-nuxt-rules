<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

const props = defineProps({
  // The product to display. In a real app this would likely come from a route
  // param + fetch, but accepting it as a prop keeps the component testable.
  product: {
    type: Object,
    required: true,
    // Shape: { title, description, price, images: string[] }
  },
  // URL the reviews are loaded from. Reviews are fetched lazily on mount.
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

// ---------------------------------------------------------------------------
// State (7 reactive variables)
// ---------------------------------------------------------------------------
const selectedImageIndex = ref(0)   // which gallery image is shown large
const quantity = ref(1)             // quantity selector value
const reviews = ref([])             // loaded review objects
const reviewsLoading = ref(false)   // true while the fetch is in flight
const reviewsError = ref(null)      // error message if the fetch failed
const cartStatus = ref('')          // transient feedback after add-to-cart
const wasAddedToCart = ref(false)   // drives the button's "added" visual state

// ---------------------------------------------------------------------------
// Derived values (4 computed properties)
// ---------------------------------------------------------------------------

// The currently selected large image, guarded against an empty gallery.
const selectedImage = computed(
  () => props.product.images?.[selectedImageIndex.value] ?? ''
)

// Line-item total for the chosen quantity.
const totalPrice = computed(() => props.product.price * quantity.value)

// Average star rating across all loaded reviews (0 when there are none).
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + (r.rating || 0), 0)
  return sum / reviews.value.length
})

// Human-friendly review count label.
const reviewCountLabel = computed(() => {
  const n = reviews.value.length
  if (n === 0) return 'No reviews yet'
  return `${n} review${n === 1 ? '' : 's'}`
})

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function selectThumbnail(index) {
  selectedImageIndex.value = index
}

function incrementQuantity() {
  quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

function clampQuantity() {
  // Keep the number input within a sane range even if typed directly.
  const n = Math.floor(Number(quantity.value))
  quantity.value = Number.isFinite(n) && n >= 1 ? n : 1
}

function addToCart() {
  emit('add-to-cart', {
    product: props.product,
    quantity: quantity.value,
    total: totalPrice.value,
  })
  cartStatus.value = `Added ${quantity.value} to cart`
  wasAddedToCart.value = true
  // Reset the visual state shortly after so the button can be reused.
  setTimeout(() => {
    wasAddedToCart.value = false
  }, 2000)
}

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const res = await fetch(props.reviewsUrl)
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    const data = await res.json()
    // Accept either a bare array or a { reviews: [...] } envelope.
    reviews.value = Array.isArray(data) ? data : data.reviews ?? []
  } catch (err) {
    reviewsError.value = err.message || 'Failed to load reviews'
    reviews.value = []
  } finally {
    reviewsLoading.value = false
  }
}

// Reload reviews if the source URL changes.
watch(() => props.reviewsUrl, loadReviews)

onMounted(loadReviews)
</script>

<template>
  <article class="product-page">
    <!-- Gallery -->
    <section class="gallery" aria-label="Product images">
      <div class="gallery__main">
        <img
          v-if="selectedImage"
          :src="selectedImage"
          :alt="product.title"
          class="gallery__image"
        />
        <div v-else class="gallery__placeholder">No image available</div>
      </div>

      <ul class="gallery__thumbs">
        <li v-for="(img, index) in product.images" :key="index">
          <button
            type="button"
            class="gallery__thumb"
            :class="{ 'gallery__thumb--active': index === selectedImageIndex }"
            :aria-current="index === selectedImageIndex"
            @click="selectThumbnail(index)"
          >
            <img :src="img" :alt="`${product.title} thumbnail ${index + 1}`" />
          </button>
        </li>
      </ul>
    </section>

    <!-- Title / description / purchase -->
    <section class="details">
      <h1 class="details__title">{{ product.title }}</h1>
      <p class="details__description">{{ product.description }}</p>
      <p class="details__price">${{ product.price.toFixed(2) }}</p>

      <div class="purchase">
        <div class="quantity" role="group" aria-label="Quantity">
          <button type="button" @click="decrementQuantity" aria-label="Decrease quantity">−</button>
          <input
            type="number"
            min="1"
            v-model.number="quantity"
            @change="clampQuantity"
            aria-label="Quantity"
          />
          <button type="button" @click="incrementQuantity" aria-label="Increase quantity">+</button>
        </div>

        <button
          type="button"
          class="add-to-cart"
          :class="{ 'add-to-cart--added': wasAddedToCart }"
          @click="addToCart"
        >
          {{ wasAddedToCart ? '✓ Added' : `Add to cart — $${totalPrice.toFixed(2)}` }}
        </button>
      </div>

      <p v-if="cartStatus" class="cart-status" role="status">{{ cartStatus }}</p>
    </section>

    <!-- Reviews -->
    <section class="reviews" aria-label="Customer reviews">
      <header class="reviews__header">
        <h2>Reviews</h2>
        <span class="reviews__summary">
          {{ reviewCountLabel }}
          <template v-if="reviews.length"> · ★ {{ averageRating.toFixed(1) }}</template>
        </span>
      </header>

      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="reviews__error" role="alert">
        {{ reviewsError }}
        <button type="button" @click="loadReviews">Retry</button>
      </p>
      <p v-else-if="reviews.length === 0">Be the first to leave a review.</p>

      <ul v-else class="reviews__list">
        <li v-for="(review, index) in reviews" :key="review.id ?? index" class="review">
          <div class="review__head">
            <strong class="review__author">{{ review.author || 'Anonymous' }}</strong>
            <span class="review__rating" :aria-label="`${review.rating || 0} out of 5 stars`">
              {{ '★'.repeat(review.rating || 0) }}{{ '☆'.repeat(Math.max(0, 5 - (review.rating || 0))) }}
            </span>
          </div>
          <p class="review__body">{{ review.body || review.text }}</p>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.product-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.gallery__main {
  aspect-ratio: 1 / 1;
  background: #f4f4f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__placeholder {
  color: #9ca3af;
}

.gallery__thumbs {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}

.gallery__thumb {
  width: 64px;
  height: 64px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: none;
}

.gallery__thumb--active {
  border-color: #2563eb;
}

.gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details__title {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
}

.details__description {
  color: #4b5563;
  line-height: 1.5;
}

.details__price {
  font-size: 1.5rem;
  font-weight: 600;
}

.purchase {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
  margin-top: 1rem;
}

.quantity {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}

.quantity button {
  width: 2.25rem;
  border: none;
  background: #f9fafb;
  font-size: 1.1rem;
  cursor: pointer;
}

.quantity input {
  width: 3rem;
  text-align: center;
  border: none;
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
  -moz-appearance: textfield;
}

.add-to-cart {
  flex: 1;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  padding: 0 1rem;
  transition: background 0.15s;
}

.add-to-cart:hover {
  background: #1d4ed8;
}

.add-to-cart--added {
  background: #16a34a;
}

.cart-status {
  color: #16a34a;
  margin-top: 0.5rem;
}

.reviews {
  grid-column: 1 / -1;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.reviews__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.reviews__summary {
  color: #6b7280;
}

.reviews__error {
  color: #dc2626;
}

.reviews__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.review {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

.review__head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.review__rating {
  color: #f59e0b;
  letter-spacing: 1px;
}

.review__body {
  margin: 0;
  color: #374151;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .product-page {
    grid-template-columns: 1fr;
  }
}
</style>
