<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'warning',
    validator: (v) => ['warning', 'error'].includes(v),
  },
})

const emit = defineEmits(['dismiss'])
</script>

<template>
  <div :class="['alert-banner', `alert-banner--${variant}`]" role="alert">
    <span class="alert-banner__message">{{ message }}</span>
    <button
      type="button"
      class="alert-banner__dismiss"
      aria-label="Dismiss"
      @click="emit('dismiss')"
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
  font-family: system-ui, sans-serif;
}

.alert-banner--warning {
  background-color: #fef3c7;
  border-color: #fcd34d;
  color: #78350f;
}

.alert-banner--error {
  background-color: #fee2e2;
  border-color: #fca5a5;
  color: #7f1d1d;
}

.alert-banner__message {
  flex: 1;
}

.alert-banner__dismiss {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0 0.25rem;
}

.alert-banner__dismiss:hover {
  opacity: 0.7;
}
</style>
