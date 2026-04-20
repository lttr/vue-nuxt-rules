<template>
  <div v-if="visible" :class="['alert-banner', `alert-banner--${variant}`]" role="alert">
    <span class="alert-banner__message">{{ message }}</span>
    <button class="alert-banner__dismiss" @click="dismiss" aria-label="Dismiss">
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
    validator: (v) => ['warning', 'error'].includes(v),
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
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid transparent;
}

.alert-banner--warning {
  background-color: #fef9c3;
  border-color: #fde047;
  color: #854d0e;
}

.alert-banner--error {
  background-color: #fee2e2;
  border-color: #fca5a5;
  color: #991b1b;
}

.alert-banner__message {
  flex: 1;
}

.alert-banner__dismiss {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 0 0 0 12px;
  color: inherit;
  opacity: 0.7;
}

.alert-banner__dismiss:hover {
  opacity: 1;
}
</style>
