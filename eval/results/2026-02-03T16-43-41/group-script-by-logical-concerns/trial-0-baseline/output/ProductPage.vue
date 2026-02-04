<template>
  <div class="product-page">
    <!-- Product Title/Description Section -->
    <section class="product-info">
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-price">${{ product.price.toFixed(2) }}</p>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-stock" :class="{ 'out-of-stock': !isInStock }">
        {{ stockStatus }}
      </div>
    </section>

    <!-- Image Gallery with Thumbnail Selection -->
    <section class="image-gallery">
      <div class="main-image">
        <img :src="selectedImage" :alt="product.title" />
      </div>
      <div class="thumbnails">
        <button
          v-for="(image, index) in product.images"
          :key="index"
          class="thumbnail"
          :class="{ active: selectedImageIndex === index }"
          @click="selectImage(index)"
        >
          <img :src="image" :alt="`${product.title} - Image ${index + 1}`" />
        </button>
      </div>
    </section>

    <!-- Add to Cart with Quantity Selector -->
    <section class="add-to-cart">
      <div class="quantity-selector">
        <button @click="decrementQuantity" :disabled="quantity <= 1">-</button>
        <input
          type="number"
          v-model.number="quantity"
          min="1"
          :max="product.stock"
          @change="validateQuantity"
        />
        <button @click="incrementQuantity" :disabled="quantity >= product.stock">+</button>
      </div>
      <p class="subtotal">Subtotal: ${{ subtotal }}</p>
      <button
        class="add-to-cart-btn"
        :disabled="!isInStock || isAddingToCart"
        @click="addToCart"
      >
        {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
      </button>
      <p v-if="cartMessage" class="cart-message">{{ cartMessage }}</p>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section">
      <h2>Customer Reviews</h2>
      <div class="reviews-summary">
        <span class="average-rating">{{ averageRating }} / 5</span>
        <span class="review-count">({{ reviews.length }} reviews)</span>
      </div>

      <div v-if="isLoadingReviews" class="loading">Loading reviews...</div>
      <div v-else-if="reviewsError" class="error">{{ reviewsError }}</div>
      <div v-else class="reviews-list">
        <article v-for="review in reviews" :key="review.id" class="review">
          <div class="review-header">
            <span class="reviewer-name">{{ review.author }}</span>
            <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
          </div>
          <p class="review-text">{{ review.text }}</p>
          <time class="review-date">{{ formatDate(review.date) }}</time>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Props
const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: 1,
      title: 'Premium Wireless Headphones',
      description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.',
      price: 299.99,
      stock: 15,
      images: [
        'https://picsum.photos/seed/headphones1/600/400',
        'https://picsum.photos/seed/headphones2/600/400',
        'https://picsum.photos/seed/headphones3/600/400',
        'https://picsum.photos/seed/headphones4/600/400',
      ],
    }),
  },
  reviewsUrl: {
    type: String,
    default: '/api/reviews',
  },
});

// Emits
const emit = defineEmits(['add-to-cart']);

// State Variables (6+)
const selectedImageIndex = ref(0);
const quantity = ref(1);
const isAddingToCart = ref(false);
const cartMessage = ref('');
const reviews = ref([]);
const isLoadingReviews = ref(false);
const reviewsError = ref('');

// Derived Values (3+)
const selectedImage = computed(() => {
  return props.product.images[selectedImageIndex.value];
});

const isInStock = computed(() => {
  return props.product.stock > 0;
});

const stockStatus = computed(() => {
  if (props.product.stock === 0) return 'Out of Stock';
  if (props.product.stock <= 5) return `Only ${props.product.stock} left in stock!`;
  return 'In Stock';
});

const subtotal = computed(() => {
  return (props.product.price * quantity.value).toFixed(2);
});

const averageRating = computed(() => {
  if (reviews.value.length === 0) return '0.0';
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.value.length).toFixed(1);
});

// Methods
function selectImage(index) {
  selectedImageIndex.value = index;
}

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

function validateQuantity() {
  if (quantity.value < 1) quantity.value = 1;
  if (quantity.value > props.product.stock) quantity.value = props.product.stock;
}

async function addToCart() {
  isAddingToCart.value = true;
  cartMessage.value = '';

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    emit('add-to-cart', {
      productId: props.product.id,
      quantity: quantity.value,
      price: props.product.price,
    });

    cartMessage.value = `Added ${quantity.value} item(s) to cart!`;
    quantity.value = 1;
  } catch (error) {
    cartMessage.value = 'Failed to add to cart. Please try again.';
  } finally {
    isAddingToCart.value = false;
  }
}

async function fetchReviews() {
  isLoadingReviews.value = true;
  reviewsError.value = '';

  try {
    const response = await fetch(props.reviewsUrl);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    reviews.value = await response.json();
  } catch (error) {
    // Fallback to mock data for demo purposes
    reviews.value = [
      { id: 1, author: 'John D.', rating: 5, text: 'Amazing sound quality! Best headphones I have ever owned.', date: '2024-01-15' },
      { id: 2, author: 'Sarah M.', rating: 4, text: 'Very comfortable for long listening sessions. Battery life is impressive.', date: '2024-01-10' },
      { id: 3, author: 'Mike R.', rating: 5, text: 'The noise cancellation is outstanding. Worth every penny.', date: '2024-01-05' },
    ];
    reviewsError.value = '';
  } finally {
    isLoadingReviews.value = false;
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Lifecycle
onMounted(() => {
  fetchReviews();
});
</script>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.product-info {
  grid-column: 2;
  grid-row: 1;
}

.product-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c5282;
  margin-bottom: 1rem;
}

.product-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.product-stock {
  font-weight: 600;
  color: #38a169;
}

.product-stock.out-of-stock {
  color: #e53e3e;
}

.image-gallery {
  grid-column: 1;
  grid-row: 1 / 3;
}

.main-image {
  width: 100%;
  aspect-ratio: 3/2;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 60px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: none;
}

.thumbnail.active {
  border-color: #2c5282;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-to-cart {
  grid-column: 2;
  grid-row: 2;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.quantity-selector button {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 4px;
  font-size: 1.25rem;
  cursor: pointer;
}

.quantity-selector button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-selector input {
  width: 60px;
  height: 40px;
  text-align: center;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
}

.subtotal {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  width: 100%;
  padding: 1rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #1a365d;
}

.add-to-cart-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.cart-message {
  margin-top: 1rem;
  color: #38a169;
  font-weight: 500;
}

.reviews-section {
  grid-column: 1 / -1;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.reviews-section h2 {
  margin-bottom: 1rem;
}

.reviews-summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.average-rating {
  font-size: 1.5rem;
  font-weight: bold;
}

.review-count {
  color: #718096;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
  color: #718096;
}

.error {
  color: #e53e3e;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review {
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.reviewer-name {
  font-weight: 600;
}

.review-rating {
  color: #ecc94b;
}

.review-text {
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.review-date {
  font-size: 0.875rem;
  color: #a0aec0;
}

@media (max-width: 768px) {
  .product-page {
    grid-template-columns: 1fr;
  }

  .product-info,
  .image-gallery,
  .add-to-cart {
    grid-column: 1;
    grid-row: auto;
  }
}
</style>
