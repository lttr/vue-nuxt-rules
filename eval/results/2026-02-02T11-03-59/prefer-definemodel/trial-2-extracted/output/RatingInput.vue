<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      :class="{ active: star <= model }"
      @click="model = star"
    >
      ★
    </button>
  </div>
</template>

<script setup>
const model = defineModel({ type: Number, default: 0 })
</script>

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
