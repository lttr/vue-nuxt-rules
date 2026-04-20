<template>
  <div class="rating-input" role="group" aria-label="Rating">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star-btn"
      :class="{ filled: star <= modelValue, hovered: star <= hovered }"
      :aria-label="`${star} star${star > 1 ? 's' : ''}`"
      :aria-pressed="star === modelValue"
      @click="emit('update:modelValue', star)"
      @mouseenter="hovered = star"
      @mouseleave="hovered = 0"
    >
      ★
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
    validator: (v) => v >= 0 && v <= 5,
  },
})

const emit = defineEmits(['update:modelValue'])

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
  line-height: 1;
  color: #ccc;
  transition: color 0.15s, transform 0.1s;
}

.star-btn:focus-visible {
  outline: 2px solid #f59e0b;
  border-radius: 2px;
}

.star-btn.filled,
.star-btn.hovered {
  color: #f59e0b;
}

.star-btn:hover {
  transform: scale(1.15);
}
</style>
