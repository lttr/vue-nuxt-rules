<script setup>
const rating = defineModel({ type: Number, default: 0 })
</script>

<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star"
      :class="{ filled: star <= rating }"
      :aria-label="`Rate ${star} out of 5`"
      @click="rating = star"
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
  cursor: pointer;
  font-size: 1.5rem;
  color: #ccc;
  padding: 0.25rem;
}

.star.filled {
  color: #f5b301;
}
</style>
