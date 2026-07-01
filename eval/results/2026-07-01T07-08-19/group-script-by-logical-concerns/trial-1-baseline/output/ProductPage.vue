<template>
  <div class="product-page">
    <section class="gallery">
      <img :src="selectedImage" :alt="product.title" class="main-image" />
      <div class="thumbnails">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          :class="['thumbnail', { active: index === selectedImageIndex }]"
          @click="selectedImageIndex = index"
        />
      </div>
    </section>

    <section class="details">
      <h1>{{ product.title }}</h1>
      <p class="price">{{ formattedPrice }}</p>
      <p class="description">{{ product.description }}</p>

      <div class="quantity-selector">
        <button @click="decrementQuantity" :disabled="quantity <= 1">-</button>
        <span>{{ quantity }}</span>
        <button @click="incrementQuantity" :disabled="quantity >= product.stock">+</button>
      </div>

      <button class="add-to-cart" :disabled="!inStock" @click="addToCart">
        {{ inStock ? `Add ${quantity} to Cart` : 'Out of Stock' }}
      </button>
      <p v-if="addedMessage" class="added-message">{{ addedMessage }}</p>
    </section>

    <section class="reviews">
      <h2>Reviews ({{ reviewCount }})</h2>
      <p v-if="reviewsLoading">Loading reviews...</p>
      <p v-else-if="reviewsError">Failed to load reviews: {{ reviewsError }}</p>
      <p v-else-if="reviewCount === 0">No reviews yet.</p>
      <div v-else>
        <p class="average-rating">Average rating: {{ averageRating }} / 5</p>
        <ul>
          <li v-for="review in reviews" :key="review.id">
            <strong>{{ review.author }}</strong> - {{ review.rating }}/5
            <p>{{ review.comment }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // expected shape: { title, description, price, stock, images: [] }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

// --- state variables (6+) ---
const selectedImageIndex = ref(0)
const quantity = ref(1)
const addedMessage = ref('')
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref('')

// --- derived values (3+) ---
const selectedImage = computed(
  () => props.product.images[selectedImageIndex.value] ?? ''
)

const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    props.product.price
  )
)

const inStock = computed(() => props.product.stock > 0)

const reviewCount = computed(() => reviews.value.length)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const total = reviews.value.reduce((sum, r) => sum + r.rating, 0)
  return (total / reviews.value.length).toFixed(1)
})

function incrementQuantity() {
  if (quantity.value < props.product.stock) quantity.value++
}

function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  emit('add-to-cart', { product: props.product, quantity: quantity.value })
  addedMessage.value = `Added ${quantity.value} item(s) to cart.`
  setTimeout(() => {
    addedMessage.value = ''
  }, 2000)
}

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = ''
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.main-image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnail {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  opacity: 0.7;
}

.thumbnail.active {
  border-color: #333;
  opacity: 1;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.quantity-selector button {
  width: 2rem;
  height: 2rem;
}

.add-to-cart {
  padding: 0.75rem 1.5rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.add-to-cart:disabled {
  background: #999;
  cursor: not-allowed;
}

.added-message {
  color: green;
  font-size: 0.9rem;
}

.reviews {
  grid-column: 1 / -1;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.reviews ul {
  list-style: none;
  padding: 0;
}

.reviews li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}
</style>
