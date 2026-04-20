<template>
  <div v-if="visible" :class="['alert-banner', `alert-banner--${variant}`]" role="alert">
    <span class="alert-banner__message">{{ message }}</span>
    <button class="alert-banner__dismiss" @click="visible = false" aria-label="Dismiss">
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

const visible = ref(true)
</script>

<style scoped>
.alert-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid transparent;
  font-size: 14px;
}

.alert-banner--warning {
  background-color: #fffbeb;
  border-color: #f59e0b;
  color: #92400e;
}

.alert-banner--error {
  background-color: #fef2f2;
  border-color: #ef4444;
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
