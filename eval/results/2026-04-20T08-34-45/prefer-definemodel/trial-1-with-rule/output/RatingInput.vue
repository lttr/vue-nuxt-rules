<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      :class="{ active: star <= model }"
      @click="model = star"
      :aria-label="`Rate ${star} out of 5`"
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
  display: flex;
  gap: 4px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #ccc;
  padding: 0;
  line-height: 1;
}

button.active {
  color: #f5a623;
}
</style>
