<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'warning',
    validator: (value) => ['warning', 'error'].includes(value),
  },
});

defineEmits(['dismiss']);
</script>

<template>
  <div class="alert-banner" :class="`alert-banner--${variant}`" role="alert">
    <span class="alert-banner__message">{{ message }}</span>
    <button
      type="button"
      class="alert-banner__dismiss"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      &times;
    </button>
  </div>
</template>

<style scoped>
.alert-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 0.95rem;
}

.alert-banner--warning {
  background-color: #fff8e1;
  border-color: #ffd54f;
  color: #8a6d00;
}

.alert-banner--error {
  background-color: #fdecea;
  border-color: #f5c2c0;
  color: #a1231d;
}

.alert-banner__message {
  flex: 1;
}

.alert-banner__dismiss {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: inherit;
  padding: 0 0.25rem;
}

.alert-banner__dismiss:hover {
  opacity: 0.75;
}
</style>
