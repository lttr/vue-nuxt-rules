<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

// --- Product info ---
const product = ref({
  title: 'Wireless Noise-Cancelling Headphones',
  description:
    'Immersive sound with adaptive noise cancellation, 30-hour battery life, and plush memory-foam earcups for all-day comfort.',
  price: 249.99,
})

const formattedPrice = computed(() => `$${product.value.price.toFixed(2)}`)

// --- Image gallery ---
const images = ref([
  { src: 'https://picsum.photos/seed/headphones-1/600/600', alt: 'Front view' },
  { src: 'https://picsum.photos/seed/headphones-2/600/600', alt: 'Side view' },
  { src: 'https://picsum.photos/seed/headphones-3/600/600', alt: 'Folded' },
  { src: 'https://picsum.photos/seed/headphones-4/600/600', alt: 'In case' },
])
const selectedImageIndex = ref(0)

const selectedImage = computed(() => images.value[selectedImageIndex.value])

function selectImage(index) {
  selectedImageIndex.value = index
}

// --- Add to cart ---
const quantity = ref(1)

const totalPrice = computed(
  () => `$${(product.value.price * quantity.value).toFixed(2)}`,
)

function incrementQuantity() {
  quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  emit('add-to-cart', {
    productTitle: product.value.title,
    quantity: quantity.value,
    unitPrice: product.value.price,
  })
}

// --- Reviews ---
const reviews = ref([])
const isLoadingReviews = ref(false)
const reviewsError = ref(null)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

async function loadReviews() {
  isLoadingReviews.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = err.message || 'Failed to load reviews'
  } finally {
    isLoadingReviews.value = false
  }
}

onMounted(loadReviews)
</script>

<template>
  <article class="product-page">
    <!-- Product info -->
    <header class="product-info">
      <h1>{{ product.title }}</h1>
      <p class="description">{{ product.description }}</p>
      <p class="price">{{ formattedPrice }}</p>
    </header>

    <!-- Image gallery -->
    <section class="gallery" aria-label="Product images">
      <img
        class="main-image"
        :src="selectedImage.src"
        :alt="selectedImage.alt"
      />
      <ul class="thumbnails">
        <li v-for="(image, index) in images" :key="image.src">
          <button
            type="button"
            :class="['thumb', { active: index === selectedImageIndex }]"
            :aria-current="index === selectedImageIndex"
            @click="selectImage(index)"
          >
            <img :src="image.src" :alt="image.alt" />
          </button>
        </li>
      </ul>
    </section>

    <!-- Add to cart -->
    <section class="cart-controls" aria-label="Purchase">
      <div class="quantity">
        <button type="button" aria-label="Decrease quantity" @click="decrementQuantity">−</button>
        <span aria-live="polite">{{ quantity }}</span>
        <button type="button" aria-label="Increase quantity" @click="incrementQuantity">+</button>
      </div>
      <button type="button" class="add-to-cart" @click="addToCart">
        Add to cart — {{ totalPrice }}
      </button>
    </section>

    <!-- Reviews -->
    <section class="reviews" aria-label="Customer reviews">
      <header class="reviews-header">
        <h2>Reviews</h2>
        <span v-if="reviews.length" class="summary">
          {{ averageRating }} ★ · {{ reviews.length }} review{{ reviews.length === 1 ? '' : 's' }}
        </span>
      </header>

      <p v-if="isLoadingReviews">Loading reviews…</p>
      <p v-else-if="reviewsError" class="error" role="alert">
        Could not load reviews: {{ reviewsError }}
        <button type="button" @click="loadReviews">Retry</button>
      </p>
      <ul v-else-if="reviews.length" class="review-list">
        <li v-for="review in reviews" :key="review.id">
          <p class="rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</p>
          <p class="author">{{ review.author }}</p>
          <p class="body">{{ review.body }}</p>
        </li>
      </ul>
      <p v-else>No reviews yet.</p>
    </section>
  </article>
</template>

<style scoped>
.product-page {
  display: grid;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.product-info h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
}
.description {
  color: #444;
  line-height: 1.5;
}
.price {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.gallery .main-image {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
}
.thumb {
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  background: none;
  cursor: pointer;
}
.thumb.active {
  border-color: #0066ff;
}
.thumb img {
  display: block;
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.quantity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
}
.quantity button {
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
}
.add-to-cart {
  padding: 0.75rem 1.25rem;
  background: #0066ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.review-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}
.review-list li {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
}
.rating {
  color: #f5a623;
  margin: 0 0 0.25rem;
}
.author {
  font-weight: 600;
  margin: 0 0 0.5rem;
}
.body {
  margin: 0;
  color: #333;
}
.error {
  color: #c00;
}
</style>
