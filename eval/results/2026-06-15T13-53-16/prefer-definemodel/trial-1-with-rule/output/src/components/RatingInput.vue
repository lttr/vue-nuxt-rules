<script setup>
// Two-way binding: the parent can both read and control the rating value.
// Using defineModel() instead of a manual prop + emit pair.
const rating = defineModel({
  type: Number,
  default: 0,
  validator: (value) => value >= 0 && value <= 5,
})

const stars = [1, 2, 3, 4, 5]

function select(value) {
  rating.value = value
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
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  color: #ccc;
  transition: color 0.15s ease;
}

.star.filled {
  color: #f5a623;
}

.star:hover {
  color: #f7b942;
}
</style>
