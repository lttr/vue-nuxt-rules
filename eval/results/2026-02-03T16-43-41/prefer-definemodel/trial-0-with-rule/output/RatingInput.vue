<script setup lang="ts">
const rating = defineModel<number>({ default: 0 })

function setRating(value: number) {
  rating.value = value
}
</script>

<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star-button"
      :class="{ active: star <= rating }"
      @click="setRating(star)"
    >
      ★
    </button>
  </div>
</template>

<style scoped>
.rating-input {
  display: inline-flex;
  gap: 4px;
}

.star-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #ccc;
  padding: 0;
  line-height: 1;
}

.star-button.active {
  color: #f5c518;
}

.star-button:hover {
  color: #f5c518;
}
</style>
