<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: 1,
      title: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
      price: 199.99,
      images: [
        'https://example.com/headphones-1.jpg',
        'https://example.com/headphones-2.jpg',
        'https://example.com/headphones-3.jpg',
      ],
    }),
  },
  reviewsUrl: {
    type: String,
    default: 'https://api.example.com/products/1/reviews',
  },
})

const emit = defineEmits(['add-to-cart'])

// --- Image gallery ---
const selectedImageIndex = ref(0)
const selectedImage = computed(() => props.product.images[selectedImageIndex.value])
function selectThumbnail(index) {
  selectedImageIndex.value = index
}

// --- Quantity & cart ---
const quantity = ref(1)
const maxQuantity = ref(10)
const totalPrice = computed(() =>
  (props.product.price * quantity.value).toFixed(2)
)
function increaseQuantity() {
  if (quantity.value < maxQuantity.value) quantity.value++
}
function decreaseQuantity() {
  if (quantity.value > 1) quantity.value--
}
function addToCart() {
  emit('add-to-cart', {
    productId: props.product.id,
    quantity: quantity.value,
  })
}

// --- Reviews ---
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)
const averageRating = computed(() => {
  if (!reviews.value.length) return 0
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})
async function loadReviews() {
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
onMounted(loadReviews)
</script>

<template>
  <section class="product-page">
    <div class="product-main">
      <div class="gallery">
        <img :src="selectedImage" :alt="product.title" class="main-image" />
        <div class="thumbnails">
          <img
            v-for="(img, i) in product.images"
            :key="i"
            :src="img"
            :alt="`${product.title} view ${i + 1}`"
            :class="['thumbnail', { active: i === selectedImageIndex }]"
            @click="selectThumbnail(i)"
          />
        </div>
      </div>

      <div class="info">
        <h1>{{ product.title }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="price">${{ product.price.toFixed(2) }}</p>

        <div class="cart-controls">
          <div class="quantity">
            <button @click="decreaseQuantity" :disabled="quantity <= 1">−</button>
            <span>{{ quantity }}</span>
            <button
              @click="increaseQuantity"
              :disabled="quantity >= maxQuantity"
            >
              +
            </button>
          </div>
          <button class="add-to-cart" @click="addToCart">
            Add to Cart — ${{ totalPrice }}
          </button>
        </div>
      </div>
    </div>

    <section class="reviews">
      <h2>Reviews ({{ reviews.length }}) — ★ {{ averageRating }}</h2>
      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="error">{{ reviewsError }}</p>
      <ul v-else-if="reviews.length">
        <li v-for="review in reviews" :key="review.id" class="review">
          <strong>{{ review.author }}</strong>
          <span>★ {{ review.rating }}</span>
          <p>{{ review.comment }}</p>
        </li>
      </ul>
      <p v-else>No reviews yet.</p>
    </section>
  </section>
</template>

<style scoped>
.product-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}
.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.main-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  background: #f4f4f5;
}
.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.thumbnail {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  background: #f4f4f5;
}
.thumbnail.active {
  border-color: #2563eb;
}
.price {
  font-size: 1.5rem;
  font-weight: 600;
}
.cart-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}
.quantity {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d4d4d8;
  border-radius: 4px;
}
.quantity button {
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}
.quantity span {
  min-width: 32px;
  text-align: center;
}
.add-to-cart {
  padding: 0.6rem 1.2rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
.reviews {
  margin-top: 2.5rem;
  border-top: 1px solid #e4e4e7;
  padding-top: 1.5rem;
}
.review {
  list-style: none;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f4f4f5;
}
.error {
  color: #dc2626;
}
</style>
