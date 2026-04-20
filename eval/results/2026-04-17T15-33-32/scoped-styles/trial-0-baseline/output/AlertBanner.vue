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

<template>
  <div
    v-if="visible"
    class="alert-banner"
    :class="`alert-banner--${variant}`"
    role="alert"
  >
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
  font-size: 0.95rem;
}

.alert-banner--warning {
  background-color: #fff8e1;
  border-color: #f5c518;
  color: #7a5d00;
}

.alert-banner--error {
  background-color: #fdecea;
  border-color: #d32f2f;
  color: #8a1f1f;
}

.alert-banner__message {
  flex: 1;
}

.alert-banner__dismiss {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  color: inherit;
  padding: 0 0.25rem;
}

.alert-banner__dismiss:hover {
  opacity: 0.7;
}
</style>
