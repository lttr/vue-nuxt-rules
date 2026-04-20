<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star-btn"
      :class="{ filled: star <= modelValue, hovered: star <= hovered }"
      :aria-label="`Rate ${star} out of 5`"
      :aria-pressed="star === modelValue"
      @click="$emit('update:modelValue', star)"
      @mouseenter="hovered = star"
      @mouseleave="hovered = 0"
    >
      ★
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

defineEmits(['update:modelValue'])

const hovered = ref(0)
</script>

<style scoped>
.rating-input {
  display: inline-flex;
  gap: 4px;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  padding: 0;
  color: #ccc;
  line-height: 1;
  transition: color 0.15s, transform 0.1s;
}

.star-btn.filled,
.star-btn.hovered {
  color: #f5a623;
}

.star-btn:hover {
  transform: scale(1.15);
}

.star-btn:focus-visible {
  outline: 2px solid #f5a623;
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
