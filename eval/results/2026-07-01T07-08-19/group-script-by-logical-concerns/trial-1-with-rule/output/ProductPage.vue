<template>
  <div class="product-page">
    <section class="product-info">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p class="price">${{ product.price.toFixed(2) }}</p>
    </section>

    <section class="gallery">
      <img :src="selectedImage" alt="Product image" class="gallery-main" />
      <div class="gallery-thumbs">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          :class="['gallery-thumb', { active: image === selectedImage }]"
          @click="selectImage(image)"
        />
      </div>
    </section>

    <section class="cart">
      <div class="quantity-selector">
        <button type="button" @click="decrementQuantity">-</button>
        <span>{{ quantity }}</span>
        <button type="button" @click="incrementQuantity">+</button>
      </div>
      <button type="button" class="add-to-cart" @click="addToCart">
        Add to Cart ({{ cartTotal }})
      </button>
    </section>

    <section class="reviews">
      <h2>Reviews ({{ reviewCount }})</h2>
      <p v-if="reviewsLoading">Loading reviews...</p>
      <p v-else-if="reviewsError">Failed to load reviews: {{ reviewsError }}</p>
      <ul v-else>
        <li v-for="review in reviews" :key="review.id">
          <strong>{{ review.author }}</strong> — {{ review.rating }}/5
          <p>{{ review.comment }}</p>
        </li>
      </ul>
      <p v-if="!reviewsLoading && !reviewsError">Average rating: {{ averageRating }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref, ref as vueRef, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

// --- Gallery ---
const selectedImage = ref(props.product.images?.[0] ?? '')

function selectImage(image) {
  selectedImage.value = image
}

// --- Cart ---
const quantity = ref(1)
const cartTotal = computed(() => quantity.value * props.product.price)

function incrementQuantity() {
  quantity.value += 1
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

function addToCart() {
  console.log(`Added ${quantity.value} of "${props.product.title}" to cart`)
}

// --- Reviews ---
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = vueRef(null)

const reviewCount = computed(() => reviews.value.length)
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0)
  return (total / reviews.value.length).toFixed(1)
})

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    reviews.value = await response.json()
  } catch (error) {
    reviewsError.value = error.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(loadReviews)
</script>

<style scoped>
.product-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
}

.gallery-main {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}

.gallery-thumbs {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.gallery-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
}

.gallery-thumb.active {
  border-color: #333;
}

.cart {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reviews ul {
  list-style: none;
  padding: 0;
}

.reviews li {
  border-bottom: 1px solid #eee;
  padding: 0.75rem 0;
}
</style>
