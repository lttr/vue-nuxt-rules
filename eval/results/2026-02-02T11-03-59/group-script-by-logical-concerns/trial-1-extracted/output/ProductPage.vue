<template>
  <div class="product-page">
    <!-- Product Info -->
    <section class="product-info">
      <h1>{{ product.title }}</h1>
      <p class="description">{{ product.description }}</p>
      <p class="price">${{ formattedPrice }}</p>
      <p v-if="!inStock" class="out-of-stock">Out of Stock</p>
    </section>

    <!-- Image Gallery -->
    <section class="image-gallery">
      <div class="main-image">
        <img :src="selectedImage" :alt="product.title" />
      </div>
      <div class="thumbnails">
        <button
          v-for="(image, index) in product.images"
          :key="index"
          :class="['thumbnail', { active: selectedImageIndex === index }]"
          @click="selectedImageIndex = index"
        >
          <img :src="image" :alt="`${product.title} thumbnail ${index + 1}`" />
        </button>
      </div>
    </section>

    <!-- Add to Cart -->
    <section class="add-to-cart">
      <div class="quantity-selector">
        <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
        <span>{{ quantity }}</span>
        <button @click="incrementQuantity" :disabled="quantity >= product.maxQuantity">+</button>
      </div>
      <p class="subtotal">Subtotal: ${{ subtotal }}</p>
      <button
        class="cart-button"
        :disabled="!inStock"
        @click="addToCart"
      >
        Add to Cart
      </button>
      <p v-if="addedToCart" class="cart-confirmation">Added to cart!</p>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <h2>Reviews ({{ reviewCount }})</h2>
      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="error">{{ reviewsError }}</p>
      <template v-else>
        <p class="average-rating">Average rating: {{ averageRating }} / 5</p>
        <ul>
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
    // Expected shape:
    // {
    //   title: string,
    //   description: string,
    //   price: number,
    //   images: string[],
    //   stock: number,
    //   maxQuantity: number,
    // }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

// --- Image gallery state ---

const selectedImageIndex = ref(0)

const selectedImage = computed(() => props.product.images[selectedImageIndex.value])

// --- Cart state ---

const quantity = ref(1)
const addedToCart = ref(false)

const inStock = computed(() => props.product.stock > 0)

const formattedPrice = computed(() => props.product.price.toFixed(2))

const subtotal = computed(() => (props.product.price * quantity.value).toFixed(2))

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function incrementQuantity() {
  if (quantity.value < props.product.maxQuantity) {
    quantity.value++
  }
}

function addToCart() {
  emit('add-to-cart', {
    product: props.product,
    quantity: quantity.value,
  })
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}

// --- Reviews state ---

const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)

const reviewCount = computed(() => reviews.value.length)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return '0.0'
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

async function fetchReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) {
      throw new Error(`Failed to load reviews (${response.status})`)
    }
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = err.message
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(fetchReviews)
</script>

<style scoped>
.product-page {
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}

.product-info .description {
  color: #555;
}

.product-info .price {
  font-size: 1.5rem;
  font-weight: bold;
}

.out-of-stock {
  color: red;
  font-weight: bold;
}

.image-gallery .main-image img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.thumbnails {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.thumbnail {
  padding: 2px;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
  border-radius: 4px;
}

.thumbnail.active {
  border-color: #333;
}

.thumbnail img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 2px;
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.quantity-selector button {
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  cursor: pointer;
}

.quantity-selector button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.subtotal {
  font-weight: bold;
  margin-bottom: 8px;
}

.cart-button {
  padding: 10px 24px;
  font-size: 1rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cart-button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.cart-confirmation {
  color: green;
  margin-top: 8px;
}

.reviews .average-rating {
  font-weight: bold;
}

.review {
  margin-bottom: 16px;
  list-style: none;
}

.review .stars {
  margin-left: 8px;
  color: #f5a623;
}

.error {
  color: red;
}
</style>
