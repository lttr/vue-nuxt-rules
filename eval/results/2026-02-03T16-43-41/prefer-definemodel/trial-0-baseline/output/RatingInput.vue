<script setup>
const rating = defineModel({ type: Number, default: 0 })
</script>

<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star-button"
      :class="{ active: star <= rating }"
      @click="rating = star"
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
  color: #ffc107;
}

.star-button:hover {
  color: #ffdb58;
}
</style>
