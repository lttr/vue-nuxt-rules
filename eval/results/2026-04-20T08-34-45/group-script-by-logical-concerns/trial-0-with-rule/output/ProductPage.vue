<template>
  <div class="product-page">

    <!-- Image Gallery -->
    <section class="gallery">
      <div class="gallery__main">
        <img :src="selectedImage" :alt="product.title" class="gallery__main-img" />
      </div>
      <div class="gallery__thumbnails">
        <button
          v-for="(img, i) in images"
          :key="i"
          class="gallery__thumb-btn"
          :class="{ 'gallery__thumb-btn--active': selectedImageIndex === i }"
          @click="selectedImageIndex = i"
        >
          <img :src="img" :alt="`${product.title} view ${i + 1}`" class="gallery__thumb-img" />
        </button>
      </div>
    </section>

    <!-- Product Info -->
    <section class="product-info">
      <h1 class="product-info__title">{{ product.title }}</h1>
      <p class="product-info__price">${{ product.price.toFixed(2) }}</p>
      <p class="product-info__description">{{ product.description }}</p>
    </section>

    <!-- Cart -->
    <section class="cart">
      <div class="cart__quantity">
        <button class="cart__qty-btn" :disabled="quantity <= 1" @click="quantity--">−</button>
        <span class="cart__qty-value">{{ quantity }}</span>
        <button class="cart__qty-btn" @click="quantity++">+</button>
      </div>
      <p class="cart__subtotal">Subtotal: ${{ subtotal }}</p>
      <button class="cart__add-btn" @click="addToCart">Add to Cart</button>
      <p v-if="cartMessage" class="cart__message">{{ cartMessage }}</p>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <h2 class="reviews__heading">
        Reviews
        <span v-if="reviews.length" class="reviews__summary">
          — {{ averageRating }} / 5 ({{ reviews.length }} {{ reviews.length === 1 ? 'review' : 'reviews' }})
        </span>
      </h2>

      <p v-if="reviewsLoading" class="reviews__state">Loading reviews…</p>
      <p v-else-if="reviewsError" class="reviews__state reviews__state--error">{{ reviewsError }}</p>
      <ul v-else-if="reviews.length" class="reviews__list">
        <li v-for="review in reviews" :key="review.id" class="reviews__item">
          <div class="reviews__item-header">
            <strong>{{ review.author }}</strong>
            <span class="reviews__stars">{{ starString(review.rating) }}</span>
          </div>
          <p class="reviews__item-body">{{ review.body }}</p>
        </li>
      </ul>
      <p v-else class="reviews__state">No reviews yet.</p>
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
  initialProduct: {
    type: Object,
    default: () => ({
      title: 'Wireless Noise-Cancelling Headphones',
      description:
        'Premium over-ear headphones with 30-hour battery life, adaptive noise cancellation, and studio-quality sound. Foldable design with carrying case included.',
      price: 149.99,
    }),
  },
  initialImages: {
    type: Array,
    default: () => [
      'https://placehold.co/600x400?text=Product+Front',
      'https://placehold.co/600x400?text=Product+Side',
      'https://placehold.co/600x400?text=Product+Back',
      'https://placehold.co/600x400?text=Product+Detail',
    ],
  },
})

// --- Image gallery ---
const images = ref(props.initialImages)
const selectedImageIndex = ref(0)

const selectedImage = computed(() => images.value[selectedImageIndex.value])

// --- Product info ---
const product = ref(props.initialProduct)

// --- Cart ---
const quantity = ref(1)
const cartMessage = ref('')

const subtotal = computed(() => (product.value.price * quantity.value).toFixed(2))

function addToCart() {
  cartMessage.value = `Added ${quantity.value} × "${product.value.title}" to your cart!`
  setTimeout(() => {
    cartMessage.value = ''
  }, 3000)
}

// --- Reviews ---
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref('')

const averageRating = computed(() => {
  if (!reviews.value.length) return '–'
  const avg = reviews.value.reduce((sum, r) => sum + r.rating, 0) / reviews.value.length
  return avg.toFixed(1)
})

function starString(rating) {
  return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))
}

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = ''
  try {
    const res = await fetch(props.reviewsUrl)
    if (!res.ok) throw new Error(`Server returned ${res.status}`)
    reviews.value = await res.json()
  } catch (err) {
    reviewsError.value = `Failed to load reviews: ${err.message}`
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
  grid-template-rows: auto auto;
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}

/* Gallery */
.gallery { grid-column: 1; grid-row: 1 / 3; }
.gallery__main-img { width: 100%; border-radius: 8px; object-fit: cover; }
.gallery__thumbnails { display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap; }
.gallery__thumb-btn {
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  background: none;
  transition: border-color 0.15s;
}
.gallery__thumb-btn--active { border-color: #4f46e5; }
.gallery__thumb-img { width: 72px; height: 72px; object-fit: cover; border-radius: 4px; display: block; }

/* Product info */
.product-info { grid-column: 2; grid-row: 1; }
.product-info__title { font-size: 1.75rem; margin: 0 0 0.25rem; }
.product-info__price { font-size: 1.4rem; color: #4f46e5; font-weight: 700; margin: 0.25rem 0; }
.product-info__description { color: #555; line-height: 1.6; }

/* Cart */
.cart { grid-column: 2; grid-row: 2; display: flex; flex-direction: column; gap: 0.75rem; }
.cart__quantity { display: flex; align-items: center; gap: 1rem; }
.cart__qty-btn {
  width: 2rem; height: 2rem;
  font-size: 1.25rem; line-height: 1;
  border: 1px solid #ccc; border-radius: 4px;
  background: #f5f5f5; cursor: pointer;
}
.cart__qty-btn:disabled { opacity: 0.4; cursor: default; }
.cart__qty-value { font-size: 1.1rem; min-width: 1.5rem; text-align: center; }
.cart__subtotal { font-size: 1rem; color: #333; margin: 0; }
.cart__add-btn {
  padding: 0.75rem 1.5rem;
  background: #4f46e5; color: #fff;
  border: none; border-radius: 6px;
  font-size: 1rem; font-weight: 600;
  cursor: pointer; transition: background 0.15s;
  align-self: flex-start;
}
.cart__add-btn:hover { background: #4338ca; }
.cart__message { color: #16a34a; font-weight: 500; margin: 0; }

/* Reviews */
.reviews { grid-column: 1 / 3; border-top: 1px solid #e5e7eb; padding-top: 1.5rem; }
.reviews__heading { font-size: 1.4rem; margin: 0 0 1rem; }
.reviews__summary { font-size: 1rem; font-weight: 400; color: #555; }
.reviews__state { color: #888; }
.reviews__state--error { color: #dc2626; }
.reviews__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
.reviews__item { background: #f9fafb; border-radius: 8px; padding: 1rem; }
.reviews__item-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
.reviews__stars { color: #f59e0b; letter-spacing: 2px; }
.reviews__item-body { margin: 0; color: #444; line-height: 1.5; }

@media (max-width: 640px) {
  .product-page { grid-template-columns: 1fr; }
  .gallery { grid-column: 1; grid-row: 1; }
  .product-info { grid-column: 1; grid-row: 2; }
  .cart { grid-column: 1; grid-row: 3; }
  .reviews { grid-column: 1; }
}
</style>
