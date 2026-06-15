<script setup>
// Two-way bound rating value (1-5). The parent both reads and controls it
// via v-model:  <RatingInput v-model="rating" />
const rating = defineModel({
  type: Number,
  default: 0,
  validator: (v) => v >= 0 && v <= 5,
})

const stars = [1, 2, 3, 4, 5]

function select(value) {
  // Clicking the current rating again clears it back to 0.
  rating.value = rating.value === value ? 0 : value
}
</script>

<template>
  <div class="rating-input" role="radiogroup" aria-label="Rating">
    <button
      v-for="star in stars"
      :key="star"
      type="button"
      class="star"
      :class="{ filled: star <= rating }"
      role="radio"
      :aria-checked="star === rating"
      :aria-label="`${star} star${star > 1 ? 's' : ''}`"
      @click="select(star)"
    >
      ★
    </button>
  </div>
</template>

<style scoped>
.rating-input {
  display: inline-flex;
  gap: 0.25rem;
}

.star {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 1.75rem;
  line-height: 1;
  color: #ccc;
  transition: color 0.15s ease;
}

.star:hover {
  color: #f5b301;
}

.star.filled {
  color: #f5b301;
}

.star:focus-visible {
  outline: 2px solid #1a73e8;
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
