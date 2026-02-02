<script setup>
const rating = defineModel({ default: 0 })
</script>

<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
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

button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ccc;
  padding: 0;
}

button.active {
  color: #f5a623;
}
</style>
