<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // { id, title, description, images: [{ src, alt }] }
  },
  reviewsUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

/* ------------------------------------------------------------------ *
 * Image gallery
 * ------------------------------------------------------------------ */
const selectedImageIndex = ref(0)

const galleryImages = computed(() => props.product.images ?? [])
const activeImage = computed(
  () => galleryImages.value[selectedImageIndex.value] ?? null,
)

function selectImage(index) {
  if (index >= 0 && index < galleryImages.value.length) {
    selectedImageIndex.value = index
  }
}

// Reset to the first image whenever the product itself changes.
watch(
  () => props.product.id,
  () => {
    selectedImageIndex.value = 0
  },
)

/* ------------------------------------------------------------------ *
 * Add to cart + quantity
 * ------------------------------------------------------------------ */
const quantity = ref(1)
const isAddingToCart = ref(false)

const canAddToCart = computed(() => quantity.value > 0 && !isAddingToCart.value)

function increaseQuantity() {
  quantity.value += 1
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

async function addToCart() {
  if (!canAddToCart.value) return

  isAddingToCart.value = true
  try {
    emit('add-to-cart', {
      productId: props.product.id,
      quantity: quantity.value,
    })
  } finally {
    isAddingToCart.value = false
  }
}

/* ------------------------------------------------------------------ *
 * Reviews
 * ------------------------------------------------------------------ */
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)

const reviewCount = computed(() => reviews.value.length)
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const total = reviews.value.reduce((sum, r) => sum + (r.rating ?? 0), 0)
  return Math.round((total / reviews.value.length) * 10) / 10
})

async function loadReviews() {
  reviewsLoading.value = true
  reviewsError.value = null
  try {
    const response = await fetch(props.reviewsUrl)
    if (!response.ok) {
      throw new Error(`Failed to load reviews (${response.status})`)
    }
    reviews.value = await response.json()
  } catch (err) {
    reviewsError.value = err.message ?? 'Unable to load reviews'
    reviews.value = []
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(loadReviews)
watch(() => props.reviewsUrl, loadReviews)
</script>

<template>
  <div class="product-page">
    <!-- Title / description -->
    <section class="product-info">
      <h1 class="product-info__title">{{ product.title }}</h1>
      <p class="product-info__description">{{ product.description }}</p>
    </section>

    <!-- Image gallery -->
    <section class="gallery">
      <div class="gallery__main">
        <img
          v-if="activeImage"
          :src="activeImage.src"
          :alt="activeImage.alt || product.title"
        />
      </div>
      <ul class="gallery__thumbs">
        <li
          v-for="(image, index) in galleryImages"
          :key="index"
        >
          <button
            type="button"
            class="gallery__thumb"
            :class="{ 'gallery__thumb--active': index === selectedImageIndex }"
            :aria-current="index === selectedImageIndex"
            @click="selectImage(index)"
          >
            <img :src="image.src" :alt="image.alt || `Thumbnail ${index + 1}`" />
          </button>
        </li>
      </ul>
    </section>

    <!-- Add to cart -->
    <section class="purchase">
      <div class="purchase__quantity">
        <button
          type="button"
          aria-label="Decrease quantity"
          :disabled="quantity <= 1"
          @click="decreaseQuantity"
        >
          −
        </button>
        <span class="purchase__quantity-value">{{ quantity }}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          @click="increaseQuantity"
        >
          +
        </button>
      </div>
      <button
        type="button"
        class="purchase__add"
        :disabled="!canAddToCart"
        @click="addToCart"
      >
        {{ isAddingToCart ? 'Adding…' : 'Add to cart' }}
      </button>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <header class="reviews__header">
        <h2>Reviews</h2>
        <p v-if="reviewCount > 0" class="reviews__summary">
          {{ averageRating }} ★ ({{ reviewCount }})
        </p>
      </header>

      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="reviews__error">{{ reviewsError }}</p>
      <p v-else-if="reviewCount === 0">No reviews yet.</p>
      <ul v-else class="reviews__list">
        <li v-for="review in reviews" :key="review.id" class="review">
          <p class="review__rating">{{ review.rating }} ★</p>
          <p class="review__author">{{ review.author }}</p>
          <p class="review__body">{{ review.body }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.product-page {
  display: grid;
  gap: 2rem;
  max-width: 60rem;
  margin: 0 auto;
}

.product-info__title {
  margin: 0 0 0.5rem;
}

.gallery__main img {
  width: 100%;
  max-height: 28rem;
  object-fit: contain;
}

.gallery__thumbs {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}

.gallery__thumb {
  padding: 0;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
}

.gallery__thumb--active {
  border-color: currentColor;
}

.gallery__thumb img {
  display: block;
  width: 4rem;
  height: 4rem;
  object-fit: cover;
}

.purchase {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.purchase__quantity {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.purchase__quantity button {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

.purchase__add {
  padding: 0.5rem 1.25rem;
  cursor: pointer;
}

.purchase__add:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reviews__header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.reviews__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.review {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.review__rating {
  font-weight: 600;
  margin: 0;
}

.reviews__error {
  color: #b00020;
}
</style>
