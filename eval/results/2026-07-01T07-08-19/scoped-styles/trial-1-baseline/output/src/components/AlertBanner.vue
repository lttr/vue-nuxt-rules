<template>
  <div v-if="visible" class="alert-banner" :class="`alert-banner--${variant}`" role="alert">
    <span class="alert-banner__message">{{ message }}</span>
    <button class="alert-banner__dismiss" aria-label="Dismiss" @click="dismiss">&times;</button>
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
  gap: 12px;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
}

.alert-banner--warning {
  background-color: #fff8e1;
  border-color: #ffe082;
  color: #7a5c00;
}

.alert-banner--error {
  background-color: #fdecea;
  border-color: #f5b5b0;
  color: #7a1f14;
}

.alert-banner__message {
  flex: 1;
}

.alert-banner__dismiss {
  background: transparent;
  border: none;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  color: inherit;
  padding: 0 4px;
}

.alert-banner__dismiss:hover {
  opacity: 0.7;
}
</style>
