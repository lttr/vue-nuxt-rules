<template>
  <div class="product-page">

    <!-- Title & Description -->
    <section class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-price">${{ product.price.toFixed(2) }}</p>
      <p class="product-description">{{ product.description }}</p>
      <div v-if="product.tags.length" class="product-tags">
        <span v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </section>

    <!-- Image Gallery -->
    <section class="gallery">
      <div class="gallery-main">
        <img :src="selectedImage.url" :alt="selectedImage.alt" class="main-image" />
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

    <!-- Quantity Selector & Add to Cart -->
    <section class="cart-section">
      <div class="quantity-selector">
        <button class="qty-btn" :disabled="quantity <= 1" @click="quantity--">−</button>
        <span class="qty-value">{{ quantity }}</span>
        <button class="qty-btn" :disabled="quantity >= 99" @click="quantity++">+</button>
      </div>
      <p class="total-price">Total: <strong>${{ totalPrice }}</strong></p>
      <button class="add-to-cart-btn" :disabled="!product.inStock" @click="addToCart">
        {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
      <transition name="fade">
        <p v-if="cartMessage" class="cart-message" :class="cartMessageClass">{{ cartMessage }}</p>
      </transition>
    </section>

    <!-- Reviews -->
    <section class="reviews-section">
      <h2 class="reviews-heading">
        Customer Reviews
        <span v-if="reviews.length" class="reviews-summary">
          {{ averageRating }} / 5 ({{ reviews.length }} review{{ reviews.length !== 1 ? 's' : '' }})
        </span>
      </h2>

      <div v-if="reviewsLoading" class="reviews-loading">Loading reviews…</div>

      <div v-else-if="reviewsError" class="reviews-error">
        {{ reviewsError }}
        <button class="retry-btn" @click="loadReviews">Retry</button>
      </div>

      <template v-else-if="reviews.length">
        <article v-for="review in reviews" :key="review.id" class="review-card">
          <header class="review-header">
            <span class="review-author">{{ review.author }}</span>
            <span class="review-stars" :aria-label="`${review.rating} out of 5 stars`">
              {{ starString(review.rating) }}
            </span>
            <time class="review-date" :datetime="review.date">{{ formatDate(review.date) }}</time>
          </header>
          <p class="review-body">{{ review.body }}</p>
        </article>
      </template>

      <p v-else class="no-reviews">No reviews yet. Be the first!</p>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  reviewsUrl: {
    type: String,
    default: 'https://dummyjson.com/comments?limit=6',
  },
})

// ── State variables (6+) ────────────────────────────────────────────────────

const product = ref({
  title: 'Wireless Noise-Cancelling Headphones',
  description:
    'Experience studio-quality sound with our flagship over-ear headphones. ' +
    'Featuring 40-hour battery life, adaptive ANC, and a premium leather headband ' +
    'that makes long listening sessions effortless.',
  price: 249.99,
  inStock: true,
  tags: ['audio', 'wireless', 'noise-cancelling'],
  images: [
    { url: 'https://picsum.photos/seed/hp1/600/400', alt: 'Headphones front view' },
    { url: 'https://picsum.photos/seed/hp2/600/400', alt: 'Headphones side view' },
    { url: 'https://picsum.photos/seed/hp3/600/400', alt: 'Headphones folded' },
    { url: 'https://picsum.photos/seed/hp4/600/400', alt: 'Headphones in case' },
  ],
})

const selectedImageIndex = ref(0)  // 1
const quantity = ref(1)             // 2
const reviews = ref([])             // 3
const reviewsLoading = ref(false)   // 4
const reviewsError = ref(null)      // 5
const cartMessage = ref('')         // 6

// ── Derived values (computed, 3+) ───────────────────────────────────────────

const selectedImage = computed(() => product.value.images[selectedImageIndex.value])

const totalPrice = computed(() =>
  (product.value.price * quantity.value).toFixed(2)
)

const averageRating = computed(() => {
  if (!reviews.value.length) return 0
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const cartMessageClass = computed(() =>
  cartMessage.value.startsWith('Error') ? 'is-error' : 'is-success'
)

// ── Methods ─────────────────────────────────────────────────────────────────

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const res = await fetch(props.reviewsUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    // Normalise dummyjson shape; adapt if your API differs.
    const raw = Array.isArray(data) ? data : data.comments ?? data.reviews ?? []
    reviews.value = raw.map((item, i) => ({
      id: item.id ?? i,
      author: item.user?.username ?? item.author ?? 'Anonymous',
      rating: item.rating ?? Math.floor(Math.random() * 2) + 4,
      body: item.body ?? item.text ?? '',
      date: item.date ?? new Date().toISOString(),
    }))
  } catch (err) {
    reviewsError.value = `Failed to load reviews: ${err.message}`
  } finally {
    reviewsLoading.value = false
  }
}

let cartTimer = null
function addToCart() {
  cartMessage.value = `Added ${quantity.value} item${quantity.value > 1 ? 's' : ''} to cart!`
  clearTimeout(cartTimer)
  cartTimer = setTimeout(() => { cartMessage.value = '' }, 3000)
}

function starString(rating) {
  return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

// ── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(loadReviews)
</script>

<style scoped>
.product-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
  color: #1a1a1a;
  display: grid;
  gap: 2.5rem;
}

/* Title & Description */
.product-title { font-size: 2rem; margin: 0 0 0.25rem; }
.product-price { font-size: 1.5rem; color: #c0392b; margin: 0 0 0.75rem; font-weight: 600; }
.product-description { line-height: 1.7; margin: 0 0 1rem; color: #444; }
.product-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.tag {
  background: #eef2ff; color: #4f46e5;
  border-radius: 999px; padding: 0.2rem 0.75rem;
  font-size: 0.8rem; font-weight: 500;
}

/* Gallery */
.gallery { display: flex; flex-direction: column; gap: 0.75rem; }
.main-image { width: 100%; border-radius: 12px; object-fit: cover; aspect-ratio: 3/2; }
.gallery-thumbnails { display: flex; gap: 0.5rem; }
.thumbnail-btn {
  border: 2px solid transparent; border-radius: 8px;
  padding: 0; cursor: pointer; background: none;
  flex: 1; min-width: 0;
}
.thumbnail-btn.active { border-color: #4f46e5; }
.thumbnail-img { width: 100%; border-radius: 6px; display: block; aspect-ratio: 1; object-fit: cover; }

/* Cart */
.cart-section { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }
.quantity-selector { display: flex; align-items: center; gap: 0.5rem; }
.qty-btn {
  width: 2rem; height: 2rem; font-size: 1.25rem; border-radius: 6px;
  border: 1px solid #ccc; background: #f5f5f5; cursor: pointer;
}
.qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.qty-value { min-width: 2rem; text-align: center; font-weight: 600; font-size: 1.1rem; }
.total-price { margin: 0; font-size: 1rem; color: #555; }
.add-to-cart-btn {
  padding: 0.7rem 1.75rem; border: none; border-radius: 8px;
  background: #4f46e5; color: #fff; font-size: 1rem; font-weight: 600;
  cursor: pointer; transition: background 0.2s;
}
.add-to-cart-btn:hover:not(:disabled) { background: #4338ca; }
.add-to-cart-btn:disabled { background: #aaa; cursor: not-allowed; }
.cart-message { width: 100%; margin: 0; font-size: 0.9rem; padding: 0.5rem 0.75rem; border-radius: 6px; }
.cart-message.is-success { background: #d1fae5; color: #065f46; }
.cart-message.is-error   { background: #fee2e2; color: #991b1b; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Reviews */
.reviews-heading { font-size: 1.4rem; margin: 0 0 1rem; display: flex; align-items: baseline; gap: 0.75rem; }
.reviews-summary { font-size: 0.9rem; color: #666; font-weight: 400; }
.reviews-loading, .no-reviews { color: #888; }
.reviews-error { color: #c0392b; display: flex; gap: 0.75rem; align-items: center; }
.retry-btn { padding: 0.25rem 0.75rem; border-radius: 6px; border: 1px solid #c0392b; background: none; color: #c0392b; cursor: pointer; }
.review-card {
  border: 1px solid #e5e7eb; border-radius: 10px;
  padding: 1rem 1.25rem; margin-bottom: 0.875rem;
}
.review-header { display: flex; gap: 0.75rem; align-items: baseline; flex-wrap: wrap; margin-bottom: 0.5rem; }
.review-author { font-weight: 600; }
.review-stars { color: #f59e0b; letter-spacing: 0.05em; }
.review-date { color: #9ca3af; font-size: 0.8rem; margin-left: auto; }
.review-body { margin: 0; line-height: 1.6; color: #444; }
</style>
