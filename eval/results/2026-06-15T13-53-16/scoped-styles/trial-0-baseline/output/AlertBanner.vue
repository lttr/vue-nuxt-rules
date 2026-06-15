<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'warning',
    validator: (value) => ['warning', 'error'].includes(value),
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['dismiss'])

const variantClass = computed(() => `alert-banner--${props.variant}`)
</script>

<template>
  <div class="alert-banner" :class="variantClass" role="alert">
    <span class="alert-banner__message">{{ message }}</span>
    <button
      v-if="dismissible"
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
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 0.95rem;
  line-height: 1.4;
}

.alert-banner__message {
  flex: 1;
}

.alert-banner__dismiss {
  flex: none;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  padding: 0;
}

.alert-banner__dismiss:hover {
  opacity: 1;
}

/* Warning (yellow) */
.alert-banner--warning {
  background-color: #fef3c7;
  border-color: #fcd34d;
  color: #92400e;
}

/* Error (red) */
.alert-banner--error {
  background-color: #fee2e2;
  border-color: #fca5a5;
  color: #991b1b;
}
</style>
