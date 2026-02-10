<template>
  <div class="rating-input">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star-button"
      :class="{ active: star <= modelValue }"
      :aria-label="`Rate ${star} star${star > 1 ? 's' : ''}`"
      @click="$emit('update:modelValue', star)"
    >
      ★
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: true,
    validator: (v) => v >= 0 && v <= 5,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.rating-input {
  display: inline-flex;
  gap: 4px;
}

.star-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ccc;
  padding: 0;
  line-height: 1;
}

.star-button.active {
  color: #f5b50a;
}
</style>
