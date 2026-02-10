<template>
  <div class="product-page">
    <!-- Product Info -->
    <section class="product-info">
      <h1>{{ product.title }}</h1>
      <p class="price">{{ formattedPrice }}</p>
      <p class="description">{{ product.description }}</p>
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
          <img :src="image" :alt="`${product.title} - image ${index + 1}`" />
        </button>
      </div>
    </section>

    <!-- Add to Cart -->
    <section class="add-to-cart">
      <div class="quantity-selector">
        <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
        <span class="quantity-display">{{ quantity }}</span>
        <button @click="incrementQuantity" :disabled="quantity >= product.stock">+</button>
      </div>
      <p class="subtotal">Subtotal: {{ formattedSubtotal }}</p>
      <button
        class="cart-button"
        :disabled="!canAddToCart"
        @click="addToCart"
      >
        {{ cartButtonLabel }}
      </button>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <h2>Reviews ({{ reviews.length }})</h2>
      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="error">{{ reviewsError }}</p>
      <template v-else>
        <p v-if="reviews.length === 0">No reviews yet.</p>
        <ul v-else>
          <li v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <strong>{{ review.author }}</strong>
              <span class="rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
            </div>
            <p>{{ review.body }}</p>
          </li>
        </ul>
        <p class="average-rating" v-if="reviews.length > 0">
          Average rating: {{ averageRating }} / 5
        </p>
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
    //   stock: number,
    //   images: string[],
    //   reviewsUrl: string,
    // }
  },
})

const emit = defineEmits(['add-to-cart'])

// --- Image gallery state & logic ---

const selectedImageIndex = ref(0)

const selectedImage = computed(() => props.product.images[selectedImageIndex.value])

// --- Quantity selector state & logic ---

const quantity = ref(1)

function incrementQuantity() {
  if (quantity.value < props.product.stock) {
    quantity.value++
  }
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// --- Cart state & logic ---

const addedToCart = ref(false)

const canAddToCart = computed(() => props.product.stock > 0 && !addedToCart.value)

const cartButtonLabel = computed(() => {
  if (props.product.stock === 0) return 'Out of Stock'
  if (addedToCart.value) return 'Added ✓'
  return 'Add to Cart'
})

function addToCart() {
  if (!canAddToCart.value) return
  emit('add-to-cart', {
    product: props.product,
    quantity: quantity.value,
  })
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}

// --- Pricing derived values ---

const formattedPrice = computed(() =>
  `$${props.product.price.toFixed(2)}`
)

const formattedSubtotal = computed(() =>
  `$${(props.product.price * quantity.value).toFixed(2)}`
)

// --- Reviews state & logic ---

const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return '0.0'
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

async function fetchReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.product.reviewsUrl)
    if (!response.ok) throw new Error(`Failed to load reviews (${response.status})`)
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
  font-family: system-ui, sans-serif;
}

.product-info .price {
  font-size: 1.5rem;
  font-weight: 600;
}

.product-info .description {
  color: #555;
  line-height: 1.6;
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

.add-to-cart {
  margin: 24px 0;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.quantity-selector button {
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
}

.quantity-selector button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

.subtotal {
  margin-top: 8px;
  font-weight: 500;
}

.cart-button {
  margin-top: 12px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #111;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cart-button:disabled {
  background: #999;
  cursor: not-allowed;
}

.reviews {
  margin-top: 32px;
}

.review-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  list-style: none;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.rating {
  color: #e4a100;
}

.error {
  color: #c00;
}

.average-rating {
  margin-top: 16px;
  font-weight: 600;
}
</style>
