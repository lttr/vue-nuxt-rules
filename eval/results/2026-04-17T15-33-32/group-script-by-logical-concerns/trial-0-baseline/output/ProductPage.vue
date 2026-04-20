<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: 'prod-001',
      title: 'Wireless Noise-Cancelling Headphones',
      description:
        'Premium over-ear headphones with active noise cancellation, 40-hour battery life, and studio-grade sound.',
      price: 299.99,
      stock: 12,
      images: [
        'https://example.com/img/headphones-1.jpg',
        'https://example.com/img/headphones-2.jpg',
        'https://example.com/img/headphones-3.jpg',
        'https://example.com/img/headphones-4.jpg'
      ]
    })
  },
  reviewsUrl: {
    type: String,
    default: 'https://api.example.com/reviews'
  }
})

const emit = defineEmits(['add-to-cart'])

// --- State (6+) ---
const selectedImageIndex = ref(0)
const quantity = ref(1)
const reviews = ref([])
const isLoadingReviews = ref(false)
const reviewsError = ref(null)
const cartMessage = ref('')

// --- Derived values (3+) ---
const selectedImage = computed(
  () => props.product.images[selectedImageIndex.value] ?? ''
)

const totalPrice = computed(() =>
  (props.product.price * quantity.value).toFixed(2)
)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + (r.rating || 0), 0)
  return (sum / reviews.value.length).toFixed(1)
})

const isOutOfStock = computed(() => props.product.stock <= 0)

// --- Methods ---
function selectThumbnail(index) {
  selectedImageIndex.value = index
}

function incrementQuantity() {
  if (quantity.value < props.product.stock) quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  if (isOutOfStock.value) return
  emit('add-to-cart', {
    productId: props.product.id,
    quantity: quantity.value,
    totalPrice: Number(totalPrice.value)
  })
  cartMessage.value = `Added ${quantity.value} item(s) to cart.`
  setTimeout(() => (cartMessage.value = ''), 2500)
}

async function loadReviews() {
  isLoadingReviews.value = true
  reviewsError.value = null
  try {
    const url = `${props.reviewsUrl}?productId=${encodeURIComponent(
      props.product.id
    )}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = err.message || 'Failed to load reviews.'
    reviews.value = []
  } finally {
    isLoadingReviews.value = false
  }
}

onMounted(loadReviews)
watch(() => props.product.id, loadReviews)
</script>

<template>
  <section class="product-page">
    <div class="product-main">
      <div class="gallery">
        <div class="main-image">
          <img :src="selectedImage" :alt="product.title" />
        </div>
        <ul class="thumbnails">
          <li
            v-for="(img, i) in product.images"
            :key="img"
            :class="{ active: i === selectedImageIndex }"
            @click="selectThumbnail(i)"
          >
            <img :src="img" :alt="`${product.title} view ${i + 1}`" />
          </li>
        </ul>
      </div>

      <div class="details">
        <h1>{{ product.title }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="price">${{ product.price.toFixed(2) }}</p>

        <div class="quantity">
          <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
          <span>{{ quantity }}</span>
          <button
            @click="incrementQuantity"
            :disabled="quantity >= product.stock"
          >
            +
          </button>
        </div>

        <p class="total">Total: ${{ totalPrice }}</p>

        <button
          class="add-to-cart"
          :disabled="isOutOfStock"
          @click="addToCart"
        >
          {{ isOutOfStock ? 'Out of Stock' : 'Add to Cart' }}
        </button>

        <p v-if="cartMessage" class="cart-message">{{ cartMessage }}</p>
      </div>
    </div>

    <section class="reviews">
      <header>
        <h2>Customer Reviews</h2>
        <span v-if="reviews.length" class="avg">
          ★ {{ averageRating }} ({{ reviews.length }})
        </span>
      </header>

      <p v-if="isLoadingReviews">Loading reviews…</p>
      <p v-else-if="reviewsError" class="error">{{ reviewsError }}</p>
      <p v-else-if="!reviews.length">No reviews yet.</p>

      <ul v-else class="review-list">
        <li v-for="review in reviews" :key="review.id">
          <strong>{{ review.author }}</strong>
          <span class="rating">★ {{ review.rating }}</span>
          <p>{{ review.body }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.product-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}
.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.main-image img {
  width: 100%;
  border-radius: 8px;
}
.thumbnails {
  list-style: none;
  padding: 0;
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
}
.thumbnails li {
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.thumbnails li.active {
  border-color: #2563eb;
}
.thumbnails img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  display: block;
}
.price {
  font-size: 1.5rem;
  font-weight: 600;
}
.quantity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
}
.quantity button {
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  cursor: pointer;
}
.add-to-cart {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
.add-to-cart:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
.cart-message {
  color: #15803d;
  margin-top: 0.5rem;
}
.reviews {
  margin-top: 3rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}
.reviews header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.review-list {
  list-style: none;
  padding: 0;
}
.review-list li {
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
}
.rating {
  margin-left: 0.5rem;
  color: #f59e0b;
}
.error {
  color: #b91c1c;
}
</style>
