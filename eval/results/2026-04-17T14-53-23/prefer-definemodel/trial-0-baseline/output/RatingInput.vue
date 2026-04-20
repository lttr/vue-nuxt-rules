<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
    validator: (v) => v >= 0 && v <= 5,
  },
})

const emit = defineEmits(['update:modelValue'])

const stars = [1, 2, 3, 4, 5]

function select(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="rating-input" role="radiogroup" aria-label="Rating">
    <button
      v-for="star in stars"
      :key="star"
      type="button"
      role="radio"
      :aria-checked="modelValue === star"
      :aria-label="`${star} star${star === 1 ? '' : 's'}`"
      :class="['star', { filled: star <= modelValue }]"
      @click="select(star)"
    >
      {{ star <= modelValue ? '★' : '☆' }}
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
  cursor: pointer;
  font-size: 1.5rem;
  padding: 2px;
  color: #ccc;
  transition: color 0.15s;
}

.star.filled {
  color: #f5b301;
}

.star:hover {
  color: #f5b301;
}

.star:focus-visible {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}
</style>
