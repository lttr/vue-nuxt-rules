<script setup lang="ts">
const rating = defineModel<number>({ required: true })

function select(value: number) {
  rating.value = value
}
</script>

<template>
  <div class="rating-input" role="radiogroup" aria-label="Rating">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      role="radio"
      :aria-checked="rating === star"
      :aria-label="`${star} star${star === 1 ? '' : 's'}`"
      class="star"
      :class="{ filled: star <= rating }"
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
  font-size: 1.5rem;
  cursor: pointer;
  color: #ccc;
  padding: 0.1rem;
}
.star.filled {
  color: #f5b301;
}
</style>
