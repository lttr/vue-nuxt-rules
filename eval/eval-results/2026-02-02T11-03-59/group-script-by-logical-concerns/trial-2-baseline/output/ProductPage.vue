<template>
  <div class="product-page">
    <div class="product-main">
      <div class="image-gallery">
        <div class="main-image">
          <img :src="selectedImage" :alt="product.title" />
        </div>
        <div class="thumbnails">
          <button
            v-for="(img, index) in product.images"
            :key="index"
            :class="['thumbnail', { active: selectedImageIndex === index }]"
            @click="selectedImageIndex = index"
          >
            <img :src="img" :alt="`${product.title} view ${index + 1}`" />
          </button>
        </div>
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-price">{{ formattedPrice }}</p>
        <p class="product-description">{{ product.description }}</p>

        <div class="quantity-selector">
          <label for="quantity">Quantity:</label>
          <button @click="decrementQuantity" :disabled="quantity <= 1">−</button>
          <input
            id="quantity"
            type="number"
            v-model.number="quantity"
            min="1"
            :max="product.stock"
          />
          <button @click="incrementQuantity" :disabled="quantity >= product.stock">+</button>
          <span class="stock-info">{{ stockStatusText }}</span>
        </div>

        <p class="subtotal">Subtotal: {{ formattedSubtotal }}</p>

        <button
          class="add-to-cart"
          :disabled="product.stock === 0"
          @click="addToCart"
        >
          {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
        </button>

        <p v-if="addedToCart" class="cart-confirmation">
          Added {{ lastAddedQuantity }} item(s) to cart.
        </p>
      </div>
    </div>

    <div class="reviews-section">
      <h2>Customer Reviews ({{ averageRatingDisplay }})</h2>

      <div v-if="reviewsLoading" class="reviews-loading">Loading reviews...</div>
      <div v-else-if="reviewsError" class="reviews-error">{{ reviewsError }}</div>
      <template v-else>
        <div class="reviews-sort">
          <label for="sort">Sort by:</label>
          <select id="sort" v-model="reviewSortOrder">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </div>

        <ul class="reviews-list">
          <li v-for="review in sortedReviews" :key="review.id" class="review-item">
            <div class="review-header">
              <span class="review-author">{{ review.author }}</span>
              <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
              <time class="review-date">{{ formatDate(review.date) }}</time>
            </div>
            <p class="review-body">{{ review.body }}</p>
          </li>
        </ul>

        <p v-if="reviews.length === 0" class="no-reviews">No reviews yet.</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // Expected shape:
    // { title, description, price, stock, images: string[], currency }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['add-to-cart']);

// --- State (6+) ---
const selectedImageIndex = ref(0);
const quantity = ref(1);
const addedToCart = ref(false);
const lastAddedQuantity = ref(0);
const reviews = ref([]);
const reviewsLoading = ref(false);
const reviewsError = ref(null);
const reviewSortOrder = ref('newest');

// --- Derived values (3+) ---
const selectedImage = computed(() => props.product.images[selectedImageIndex.value]);

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.product.currency || 'USD',
  }).format(props.product.price);
});

const formattedSubtotal = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.product.currency || 'USD',
  }).format(props.product.price * quantity.value);
});

const stockStatusText = computed(() => {
  const stock = props.product.stock;
  if (stock === 0) return 'Out of stock';
  if (stock <= 5) return `Only ${stock} left`;
  return `${stock} in stock`;
});

const averageRatingDisplay = computed(() => {
  if (reviews.value.length === 0) return 'No ratings';
  const avg = reviews.value.reduce((sum, r) => sum + r.rating, 0) / reviews.value.length;
  return `${avg.toFixed(1)} / 5`;
});

const sortedReviews = computed(() => {
  const copy = [...reviews.value];
  switch (reviewSortOrder.value) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'oldest':
      return copy.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'highest':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return copy.sort((a, b) => a.rating - b.rating);
    default:
      return copy;
  }
});

// --- Methods ---
function incrementQuantity() {
  if (quantity.value < props.product.stock) {
    quantity.value++;
  }
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function addToCart() {
  lastAddedQuantity.value = quantity.value;
  addedToCart.value = true;
  emit('add-to-cart', {
    productId: props.product.id,
    quantity: quantity.value,
  });
  setTimeout(() => {
    addedToCart.value = false;
  }, 3000);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

async function fetchReviews() {
  reviewsLoading.value = true;
  reviewsError.value = null;
  try {
    const response = await fetch(props.reviewsUrl);
    if (!response.ok) throw new Error(`Failed to load reviews (${response.status})`);
    reviews.value = await response.json();
  } catch (err) {
    reviewsError.value = err.message;
  } finally {
    reviewsLoading.value = false;
  }
}

onMounted(fetchReviews);
</script>

<style scoped>
.product-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
}

.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Image gallery */
.main-image {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

.main-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.thumbnail {
  width: 64px;
  height: 64px;
  padding: 2px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  background: #fafafa;
  overflow: hidden;
}

.thumbnail.active {
  border-color: #2563eb;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

/* Product info */
.product-title {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #16a34a;
  margin: 0 0 1rem;
}

.product-description {
  line-height: 1.6;
  color: #444;
  margin-bottom: 1.5rem;
}

/* Quantity */
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.quantity-selector button {
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 1rem;
}

.quantity-selector button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity-selector input {
  width: 48px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 32px;
  font-size: 0.95rem;
}

.stock-info {
  font-size: 0.85rem;
  color: #666;
  margin-left: 0.5rem;
}

.subtotal {
  font-weight: 600;
  margin-bottom: 1rem;
}

.add-to-cart {
  padding: 0.75rem 2rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
}

.add-to-cart:hover:not(:disabled) {
  background: #1d4ed8;
}

.add-to-cart:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.cart-confirmation {
  color: #16a34a;
  font-weight: 500;
  margin-top: 0.75rem;
}

/* Reviews */
.reviews-section {
  border-top: 1px solid #e0e0e0;
  padding-top: 2rem;
}

.reviews-section h2 {
  margin: 0 0 1rem;
}

.reviews-sort {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reviews-sort select {
  padding: 0.35rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.reviews-loading,
.reviews-error,
.no-reviews {
  padding: 1rem;
  color: #666;
}

.reviews-error {
  color: #dc2626;
}

.reviews-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.review-item {
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.review-author {
  font-weight: 600;
}

.review-rating {
  color: #f59e0b;
}

.review-date {
  font-size: 0.85rem;
  color: #888;
}

.review-body {
  line-height: 1.6;
  color: #333;
  margin: 0;
}

@media (max-width: 640px) {
  .product-main {
    grid-template-columns: 1fr;
  }
}
</style>
