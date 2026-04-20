<template>
  <div class="product-page">
    <!-- Product Title & Description -->
    <section class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-meta">
        <span class="product-price">${{ formattedPrice }}</span>
        <span class="stock-status" :class="stockStatusClass">{{ stockStatusText }}</span>
      </div>
    </section>

    <!-- Image Gallery -->
    <section class="image-gallery">
      <div class="main-image-wrapper">
        <img :src="selectedImage" :alt="product.title" class="main-image" />
      </div>
      <div class="thumbnails">
        <button
          v-for="(img, index) in product.images"
          :key="index"
          class="thumbnail-btn"
          :class="{ active: selectedImageIndex === index }"
          @click="selectedImageIndex = index"
        >
          <img :src="img" :alt="`${product.title} view ${index + 1}`" class="thumbnail-img" />
        </button>
      </div>
    </section>

    <!-- Add to Cart -->
    <section class="cart-section">
      <div class="quantity-selector">
        <button class="qty-btn" :disabled="quantity <= 1" @click="quantity--">−</button>
        <span class="qty-display">{{ quantity }}</span>
        <button class="qty-btn" :disabled="quantity >= product.stock" @click="quantity++">+</button>
      </div>
      <button
        class="add-to-cart-btn"
        :disabled="!isInStock || cartLoading"
        @click="addToCart"
      >
        <span v-if="cartLoading">Adding...</span>
        <span v-else-if="!isInStock">Out of Stock</span>
        <span v-else>Add to Cart — ${{ cartTotal }}</span>
      </button>
      <p v-if="cartMessage" class="cart-message">{{ cartMessage }}</p>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section">
      <h2>Customer Reviews</h2>
      <div class="reviews-summary">
        <span class="avg-rating">{{ averageRating }} / 5</span>
        <span class="review-count">({{ reviews.length }} reviews)</span>
      </div>

      <div v-if="reviewsLoading" class="reviews-loading">Loading reviews...</div>
      <div v-else-if="reviewsError" class="reviews-error">{{ reviewsError }}</div>
      <ul v-else class="reviews-list">
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <span class="reviewer-name">{{ review.author }}</span>
            <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
            <span class="review-date">{{ review.date }}</span>
          </div>
          <p class="review-body">{{ review.body }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  reviewsUrl: {
    type: String,
    required: true,
  },
  product: {
    type: Object,
    default: () => ({
      title: 'Premium Wireless Headphones',
      description:
        'Experience crystal-clear audio with our flagship wireless headphones. Featuring 40-hour battery life, active noise cancellation, and premium comfort for all-day wear.',
      price: 149.99,
      stock: 12,
      images: [
        'https://placehold.co/600x400?text=Product+Front',
        'https://placehold.co/600x400?text=Product+Side',
        'https://placehold.co/600x400?text=Product+Back',
        'https://placehold.co/600x400?text=Product+Detail',
      ],
    }),
  },
})

// State variables (6+)
const selectedImageIndex = ref(0)
const quantity = ref(1)
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)
const cartLoading = ref(false)
const cartMessage = ref('')

// Derived values (3+)
const selectedImage = computed(() => props.product.images[selectedImageIndex.value])

const isInStock = computed(() => props.product.stock > 0)

const stockStatusClass = computed(() => (isInStock.value ? 'in-stock' : 'out-of-stock'))

const stockStatusText = computed(() =>
  isInStock.value ? `${props.product.stock} in stock` : 'Out of stock'
)

const formattedPrice = computed(() => props.product.price.toFixed(2))

const cartTotal = computed(() => (props.product.price * quantity.value).toFixed(2))

const averageRating = computed(() => {
  if (!reviews.value.length) return '—'
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

// Methods
async function addToCart() {
  cartLoading.value = true
  cartMessage.value = ''
  try {
    // Simulate async cart operation
    await new Promise((resolve) => setTimeout(resolve, 800))
    cartMessage.value = `Added ${quantity.value} item${quantity.value > 1 ? 's' : ''} to your cart!`
    quantity.value = 1
  } finally {
    cartLoading.value = false
  }
}

async function fetchReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const res = await fetch(props.reviewsUrl)
    if (!res.ok) throw new Error(`Failed to load reviews (${res.status})`)
    reviews.value = await res.json()
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
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
  color: #1a1a1a;
  display: grid;
  gap: 2.5rem;
}

/* Product Info */
.product-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
}
.product-description {
  font-size: 1.05rem;
  color: #444;
  line-height: 1.6;
  margin: 0 0 1rem;
}
.product-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0070f3;
}
.stock-status {
  font-size: 0.9rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}
.in-stock {
  background: #e6f4ea;
  color: #1a7f37;
}
.out-of-stock {
  background: #fce8e8;
  color: #c0392b;
}

/* Gallery */
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.main-image-wrapper {
  border-radius: 8px;
  overflow: hidden;
  background: #f4f4f4;
}
.main-image {
  width: 100%;
  display: block;
  object-fit: cover;
  max-height: 420px;
}
.thumbnails {
  display: flex;
  gap: 0.5rem;
}
.thumbnail-btn {
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 2px;
  background: none;
  cursor: pointer;
  transition: border-color 0.15s;
}
.thumbnail-btn.active,
.thumbnail-btn:hover {
  border-color: #0070f3;
}
.thumbnail-img {
  width: 72px;
  height: 56px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

/* Cart Section */
.cart-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}
.qty-btn {
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  transition: background 0.15s;
}
.qty-btn:hover:not(:disabled) {
  background: #e0e0e0;
}
.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.qty-display {
  width: 40px;
  text-align: center;
  font-weight: 600;
}
.add-to-cart-btn {
  padding: 0.6rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}
.add-to-cart-btn:hover:not(:disabled) {
  background: #005cc5;
}
.add-to-cart-btn:disabled {
  background: #aaa;
  cursor: not-allowed;
}
.cart-message {
  width: 100%;
  color: #1a7f37;
  font-weight: 500;
  margin: 0;
}

/* Reviews */
.reviews-section h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
.reviews-summary {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.avg-rating {
  font-size: 1.5rem;
  font-weight: 700;
}
.review-count {
  color: #666;
}
.reviews-loading,
.reviews-error {
  padding: 1rem;
  border-radius: 6px;
  background: #f5f5f5;
  color: #666;
}
.reviews-error {
  background: #fce8e8;
  color: #c0392b;
}
.reviews-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.review-item {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}
.review-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}
.reviewer-name {
  font-weight: 600;
}
.review-rating {
  color: #f5a623;
  letter-spacing: 1px;
}
.review-date {
  color: #999;
  font-size: 0.85rem;
  margin-left: auto;
}
.review-body {
  margin: 0;
  line-height: 1.5;
  color: #333;
}
</style>
