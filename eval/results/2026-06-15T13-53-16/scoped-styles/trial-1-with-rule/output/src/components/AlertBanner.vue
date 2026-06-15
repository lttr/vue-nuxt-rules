<template>
  <div v-if="visible" class="alert-banner" :class="`alert-banner--${variant}`" role="alert">
    <span class="alert-banner__message">{{ message }}</span>
    <button
      type="button"
      class="alert-banner__dismiss"
      aria-label="Dismiss"
      @click="dismiss"
    >
      &times;
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
})

const emit = defineEmits(['dismiss'])

const visible = ref(true)

function dismiss() {
  visible.value = false
  emit('dismiss')
}
</script>

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
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.25rem;
  opacity: 0.7;
}

.alert-banner__dismiss:hover {
  opacity: 1;
}

.alert-banner--warning {
  background-color: #fff8e1;
  border-color: #ffe082;
  color: #8a6d00;
}

.alert-banner--error {
  background-color: #fdecea;
  border-color: #f5c2c0;
  color: #b71c1c;
}
</style>
