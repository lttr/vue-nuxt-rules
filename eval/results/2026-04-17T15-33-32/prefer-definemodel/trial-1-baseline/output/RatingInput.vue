<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
    validator: (v) => v >= 0 && v <= 5,
  },
})

const emit = defineEmits(['update:modelValue'])

function select(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="rating-input" role="radiogroup" aria-label="Rating">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      role="radio"
      :aria-checked="star === props.modelValue"
      :aria-label="`${star} star${star === 1 ? '' : 's'}`"
      class="star"
      :class="{ filled: star <= props.modelValue }"
      @click="select(star)"
    >
      {{ star <= props.modelValue ? '★' : '☆' }}
    </button>
  </div>
</template>

<style scoped>
.rating-input {
  display: inline-flex;
  gap: 0.25rem;
}

.star {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #ccc;
  padding: 0.25rem;
  line-height: 1;
}

.star.filled {
  color: #f5b301;
}

.star:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
