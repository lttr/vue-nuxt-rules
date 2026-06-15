<script setup>
// Two-way binding via defineModel() — the parent can read and control the
// rating with v-model. Valid values are 1-5.
const rating = defineModel({
  type: Number,
  default: 0,
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
      :aria-label="`${star} star${star === 1 ? '' : 's'}`"
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
  font-size: 1.5rem;
  line-height: 1;
  color: #ccc;
  transition: color 0.15s ease;
}

.star.filled {
  color: #f5b301;
}

.star:focus-visible {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}
</style>
