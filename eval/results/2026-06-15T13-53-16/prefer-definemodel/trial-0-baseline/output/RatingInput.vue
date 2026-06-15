<script setup>
// Two-way binding: the parent reads and controls the rating via v-model.
// `defineModel` (Vue 3.4+) exposes a writable ref wired to the parent's v-model.
const rating = defineModel({
  type: Number,
  default: 0,
  validator: (value) => value >= 0 && value <= 5,
})

const stars = [1, 2, 3, 4, 5]

function select(value) {
  // Click the currently selected star to clear the rating.
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
      {{ star <= rating ? '★' : '☆' }}
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

.star.filled {
  color: #f5b301;
}

.star:hover {
  color: #f5b301;
}

.star:focus-visible {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
