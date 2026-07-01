<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star"
      :class="{ filled: star <= rating }"
      :aria-label="`Rate ${star} star${star > 1 ? 's' : ''}`"
      @click="rating = star"
    >★</button>
  </div>
</template>

<script setup>
const rating = defineModel({ type: Number, default: 0 })
</script>

<style scoped>
.rating-input {
  display: inline-flex;
  gap: 4px;
}

.star {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  color: #ccc;
  padding: 0;
}

.star.filled {
  color: #f5b301;
}
</style>
