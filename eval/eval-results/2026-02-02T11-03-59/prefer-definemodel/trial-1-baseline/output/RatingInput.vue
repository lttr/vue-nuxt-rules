<script setup>
const rating = defineModel({ type: Number, default: 0 })
</script>

<template>
  <div class="rating-input">
    <button
      v-for="n in 5"
      :key="n"
      type="button"
      :class="['star', { active: n <= rating }]"
      @click="rating = n"
      :aria-label="`Rate ${n} star${n > 1 ? 's' : ''}`"
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

.star {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ccc;
  padding: 0;
  line-height: 1;
}

.star.active {
  color: #f5a623;
}
</style>
