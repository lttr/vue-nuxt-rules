<template>
  <div class="rating-input" role="radiogroup" aria-label="Rating">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star"
      :class="{ filled: star <= modelValue }"
      role="radio"
      :aria-checked="star === modelValue"
      :aria-label="`${star} star${star > 1 ? 's' : ''}`"
      @click="$emit('update:modelValue', star)"
    >
      <span aria-hidden="true">{{ star <= modelValue ? '★' : '☆' }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: true,
    validator: (v) => v >= 1 && v <= 5,
  },
})

defineEmits(['update:modelValue'])
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
  padding: 0;
  font-size: 1.5rem;
  line-height: 1;
  color: #ccc;
}

.star.filled {
  color: #f5b301;
}
</style>
