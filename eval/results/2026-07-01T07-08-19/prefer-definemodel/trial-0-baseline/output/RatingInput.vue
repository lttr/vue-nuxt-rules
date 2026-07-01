<template>
  <div class="rating-input" role="radiogroup" aria-label="Rating">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star"
      :class="{ filled: star <= displayValue }"
      role="radio"
      :aria-checked="star === modelValue"
      :aria-label="`${star} star${star > 1 ? 's' : ''}`"
      @click="select(star)"
      @mouseenter="hovered = star"
      @mouseleave="hovered = 0"
    >★</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
    validator: (v) => v >= 1 && v <= 5,
  },
})

const emit = defineEmits(['update:modelValue'])

const hovered = ref(0)
const displayValue = computed(() => hovered.value || props.modelValue)

function select(star) {
  emit('update:modelValue', star)
}
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
  padding: 0;
  color: #ccc;
  transition: color 0.15s ease;
}

.star.filled {
  color: #f5b301;
}

.star:focus-visible {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}
</style>
