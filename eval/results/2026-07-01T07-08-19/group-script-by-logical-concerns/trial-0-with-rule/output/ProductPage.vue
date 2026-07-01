<template>
  <div class="product-page">
    <!-- Title & description -->
    <section class="product-info">
      <h1>{{ product.title }}</h1>
      <p class="price">{{ formattedPrice }}</p>
      <p class="description">{{ product.description }}</p>
    </section>

    <!-- Image gallery -->
    <section class="gallery">
      <img class="main-image" :src="selectedImage" :alt="product.title" />
      <div class="thumbnails">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          class="thumbnail"
          :class="{ active: image === selectedImage }"
          @click="selectImage(image)"
        />
      </div>
    </section>

    <!-- Add to cart -->
    <section class="add-to-cart">
      <div class="quantity-selector">
        <button type="button" @click="decrementQuantity" :disabled="quantity <= 1">-</button>
        <span>{{ quantity }}</span>
        <button type="button" @click="incrementQuantity" :disabled="quantity >= product.stock">+</button>
      </div>
      <p class="stock-status">{{ stockStatus }}</p>
      <button
        type="button"
        class="add-to-cart-button"
        :disabled="!canAddToCart"
        @click="addToCart"
      >
        Add to Cart · {{ formattedTotalPrice }}
      </button>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <h2>Reviews ({{ reviews.length }})</h2>
      <p v-if="reviewsLoading">Loading reviews...</p>
      <p v-else-if="reviewsError">Failed to load reviews: {{ reviewsError }}</p>
      <ul v-else>
        <li v-for="review in reviews" :key="review.id">
          <strong>{{ review.author }}</strong> — {{ review.rating }}/5
          <p>{{ review.comment }}</p>
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
    // expected shape: { title, description, price, images: [], stock }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

// --- State variables ---
const selectedImage = ref(props.product.images?.[0] ?? '')
const quantity = ref(1)
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)
const justAdded = ref(false)

// --- Derived values ---
const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.product.price)
)

const formattedTotalPrice = computed(() =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    props.product.price * quantity.value
  )
)

const canAddToCart = computed(() => props.product.stock > 0 && quantity.value <= props.product.stock)

const stockStatus = computed(() => {
  if (props.product.stock <= 0) return 'Out of stock'
  if (props.product.stock <= 5) return `Only ${props.product.stock} left in stock`
  return 'In stock'
})

// --- Gallery methods ---
function selectImage(image) {
  selectedImage.value = image
}

// --- Cart methods ---
function incrementQuantity() {
  if (quantity.value < props.product.stock) quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  if (!canAddToCart.value) return
  emit('add-to-cart', { product: props.product, quantity: quantity.value })
  justAdded.value = true
}

// --- Reviews loading ---
async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    reviews.value = await response.json()
  } catch (error) {
    reviewsError.value = error.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(() => {
  loadReviews()
})
</script>

<style scoped>
.product-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
}

.price {
  font-size: 1.25rem;
  font-weight: 600;
}

.gallery {
  margin: 1.5rem 0;
}

.main-image {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  border-radius: 8px;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.thumbnail {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail.active {
  border-color: #333;
}

.add-to-cart {
  margin: 1.5rem 0;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.add-to-cart-button {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.add-to-cart-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reviews {
  margin-top: 2rem;
}
</style>
