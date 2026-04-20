<template>
  <div class="product-page">

    <!-- Product Info -->
    <section class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-price">${{ product.price.toFixed(2) }}</p>
      <p class="product-description">{{ product.description }}</p>
    </section>

    <!-- Image Gallery -->
    <section class="gallery">
      <div class="gallery-main">
        <img :src="selectedImage.url" :alt="selectedImage.alt" class="gallery-main-image" />
      </div>
      <div class="gallery-thumbnails">
        <button
          v-for="(image, index) in product.images"
          :key="index"
          class="thumbnail-btn"
          :class="{ active: selectedImageIndex === index }"
          @click="selectedImageIndex = index"
        >
          <img :src="image.url" :alt="image.alt" class="thumbnail-img" />
        </button>
      </div>
    </section>

    <!-- Cart Controls -->
    <section class="cart-controls">
      <div class="quantity-selector">
        <button @click="decrementQuantity" :disabled="quantity <= 1" class="qty-btn">−</button>
        <span class="qty-display">{{ quantity }}</span>
        <button @click="incrementQuantity" :disabled="isOutOfStock" class="qty-btn">+</button>
      </div>
      <button
        class="add-to-cart-btn"
        :disabled="isOutOfStock || addedToCart"
        @click="handleAddToCart"
      >
        {{ addedToCart ? 'Added!' : isOutOfStock ? 'Out of Stock' : 'Add to Cart' }}
      </button>
      <p v-if="isOutOfStock" class="stock-warning">This item is currently out of stock.</p>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <h2 class="reviews-heading">
        Customer Reviews
        <span v-if="reviews.length" class="reviews-summary">
          {{ averageRating }} / 5 ({{ totalReviewCount }} {{ totalReviewCount === 1 ? 'review' : 'reviews' }})
        </span>
      </h2>

      <div v-if="reviewsLoading" class="reviews-loading">Loading reviews…</div>
      <div v-else-if="reviewsError" class="reviews-error">{{ reviewsError }}</div>
      <ul v-else-if="reviews.length" class="reviews-list">
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <strong class="review-author">{{ review.author }}</strong>
            <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
          </div>
          <p class="review-body">{{ review.body }}</p>
        </li>
      </ul>
      <p v-else class="reviews-empty">No reviews yet. Be the first!</p>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// --- Product concern ---
const product = ref({
  title: 'Classic Leather Sneakers',
  description:
    'Timeless design meets everyday comfort. Crafted from full-grain leather with a cushioned insole and durable rubber outsole. Available in multiple colorways.',
  price: 129.99,
  stock: 12,
  images: [
    { url: 'https://placehold.co/600x400?text=Front', alt: 'Front view' },
    { url: 'https://placehold.co/600x400?text=Side', alt: 'Side view' },
    { url: 'https://placehold.co/600x400?text=Back', alt: 'Back view' },
    { url: 'https://placehold.co/600x400?text=Detail', alt: 'Detail view' },
  ],
})

const isOutOfStock = computed(() => product.value.stock === 0)

// --- Gallery concern ---
const selectedImageIndex = ref(0)

const selectedImage = computed(() => product.value.images[selectedImageIndex.value])

// --- Cart concern ---
const quantity = ref(1)
const addedToCart = ref(false)

function incrementQuantity() {
  if (quantity.value < product.value.stock) quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

function handleAddToCart() {
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}

// --- Reviews concern ---
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)

const averageRating = computed(() => {
  if (!reviews.value.length) return 0
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const totalReviewCount = computed(() => reviews.value.length)

async function fetchReviews(url) {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to load reviews (${res.status})`)
    reviews.value = await res.json()
  } catch (err) {
    reviewsError.value = err.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(() => {
  fetchReviews('https://api.example.com/products/1/reviews')
})
</script>

<style scoped>
.product-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Product info */
.product-title { font-size: 1.75rem; margin: 0 0 0.25rem; }
.product-price { font-size: 1.25rem; font-weight: 600; color: #2d6a4f; margin: 0 0 0.75rem; }
.product-description { color: #555; line-height: 1.6; margin: 0; }

/* Gallery */
.gallery { display: flex; flex-direction: column; gap: 0.75rem; }
.gallery-main-image { width: 100%; border-radius: 8px; object-fit: cover; max-height: 420px; }
.gallery-thumbnails { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.thumbnail-btn {
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 2px;
  background: none;
  cursor: pointer;
  transition: border-color 0.15s;
}
.thumbnail-btn.active { border-color: #2d6a4f; }
.thumbnail-img { width: 72px; height: 56px; object-fit: cover; border-radius: 4px; display: block; }

/* Cart */
.cart-controls { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.quantity-selector { display: flex; align-items: center; gap: 0.5rem; }
.qty-btn {
  width: 36px; height: 36px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.15s;
}
.qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.qty-btn:not(:disabled):hover { background: #f0f0f0; }
.qty-display { min-width: 28px; text-align: center; font-size: 1rem; font-weight: 600; }
.add-to-cart-btn {
  padding: 0.6rem 1.5rem;
  background: #2d6a4f;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}
.add-to-cart-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.add-to-cart-btn:not(:disabled):hover { background: #1b4332; }
.stock-warning { color: #c0392b; margin: 0; font-size: 0.9rem; }

/* Reviews */
.reviews-heading { font-size: 1.4rem; margin: 0 0 1rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.reviews-summary { font-size: 1rem; font-weight: 400; color: #555; }
.reviews-loading, .reviews-empty { color: #888; }
.reviews-error { color: #c0392b; }
.reviews-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
.review-item { border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem; }
.review-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
.review-author { font-weight: 600; }
.review-rating { color: #f39c12; letter-spacing: 1px; }
.review-body { margin: 0; color: #444; line-height: 1.5; }
</style>
