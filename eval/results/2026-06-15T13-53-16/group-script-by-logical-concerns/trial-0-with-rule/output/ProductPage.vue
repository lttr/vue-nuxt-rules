<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // { title, description, price, images: string[] }
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

const activeImage = computed(
  () => props.product.images?.[selectedImageIndex.value] ?? '',
)

function selectThumbnail(index) {
  selectedImageIndex.value = index
}

/* ------------------------------------------------------------------ *
 * Add to cart / quantity
 * ------------------------------------------------------------------ */
const quantity = ref(1)
const maxQuantity = ref(10)
const isAddingToCart = ref(false)

const lineTotal = computed(() => props.product.price * quantity.value)

function changeQuantity(delta) {
  const next = quantity.value + delta
  quantity.value = Math.min(Math.max(next, 1), maxQuantity.value)
}

async function addToCart() {
  isAddingToCart.value = true
  try {
    emit('add-to-cart', {
      product: props.product,
      quantity: quantity.value,
      total: lineTotal.value,
    })
  } finally {
    isAddingToCart.value = false
  }
}

/* ------------------------------------------------------------------ *
 * Reviews (loaded from a URL)
 * ------------------------------------------------------------------ */
const reviews = ref([])
const reviewsLoading = ref(false)
const reviewsError = ref(null)

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, r) => acc + (r.rating ?? 0), 0)
  return sum / reviews.value.length
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
    reviews.value = []
  } finally {
    reviewsLoading.value = false
  }
}

onMounted(loadReviews)
</script>

<template>
  <article class="product-page">
    <!-- Title / description -->
    <header class="product-info">
      <h1 class="product-info__title">{{ product.title }}</h1>
      <p class="product-info__description">{{ product.description }}</p>
      <p class="product-info__price">${{ product.price.toFixed(2) }}</p>
    </header>

    <!-- Image gallery -->
    <section class="gallery">
      <div class="gallery__main">
        <img v-if="activeImage" :src="activeImage" :alt="product.title" />
      </div>
      <ul class="gallery__thumbs">
        <li
          v-for="(image, index) in product.images"
          :key="index"
          :class="{ 'is-active': index === selectedImageIndex }"
        >
          <button type="button" @click="selectThumbnail(index)">
            <img :src="image" :alt="`${product.title} thumbnail ${index + 1}`" />
          </button>
        </li>
      </ul>
    </section>

    <!-- Add to cart -->
    <section class="purchase">
      <div class="purchase__quantity">
        <button type="button" :disabled="quantity <= 1" @click="changeQuantity(-1)">
          −
        </button>
        <span class="purchase__quantity-value">{{ quantity }}</span>
        <button
          type="button"
          :disabled="quantity >= maxQuantity"
          @click="changeQuantity(1)"
        >
          +
        </button>
      </div>

      <button
        type="button"
        class="purchase__add"
        :disabled="isAddingToCart"
        @click="addToCart"
      >
        {{ isAddingToCart ? 'Adding…' : `Add to cart — $${lineTotal.toFixed(2)}` }}
      </button>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <header class="reviews__header">
        <h2>Reviews</h2>
        <span v-if="reviews.length" class="reviews__average">
          {{ averageRating.toFixed(1) }} ★ ({{ reviews.length }})
        </span>
      </header>

      <p v-if="reviewsLoading">Loading reviews…</p>
      <p v-else-if="reviewsError" class="reviews__error">{{ reviewsError }}</p>
      <p v-else-if="reviews.length === 0">No reviews yet.</p>

      <ul v-else class="reviews__list">
        <li v-for="(review, index) in reviews" :key="review.id ?? index">
          <p class="reviews__rating">{{ review.rating }} ★</p>
          <p class="reviews__author">{{ review.author }}</p>
          <p class="reviews__body">{{ review.body }}</p>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.product-page {
  display: grid;
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

.product-info__title {
  margin: 0 0 0.5rem;
}

.product-info__price {
  font-size: 1.5rem;
  font-weight: 700;
}

.gallery__main img {
  width: 100%;
  max-height: 480px;
  object-fit: contain;
}

.gallery__thumbs {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}

.gallery__thumbs button {
  padding: 0;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
}

.gallery__thumbs .is-active button {
  border-color: #2563eb;
}

.gallery__thumbs img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  display: block;
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
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.purchase__add:disabled {
  opacity: 0.6;
  cursor: default;
}

.reviews__header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.reviews__list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.reviews__rating {
  font-weight: 700;
  margin: 0;
}

.reviews__author {
  color: #6b7280;
  margin: 0.25rem 0;
}

.reviews__error {
  color: #dc2626;
}
</style>
