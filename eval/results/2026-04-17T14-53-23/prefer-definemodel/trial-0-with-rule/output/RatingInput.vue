<script setup>
const rating = defineModel({ type: Number, default: 0 })
</script>

<template>
  <div class="rating-input">
    <button
      v-for="n in 5"
      :key="n"
      type="button"
      class="star"
      :class="{ active: n <= rating }"
      :aria-label="`Rate ${n} out of 5`"
      @click="rating = n"
    >
      {{ n <= rating ? '★' : '☆' }}
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
  padding: 0;
}
.star.active {
  color: #f5a623;
}
</style>
