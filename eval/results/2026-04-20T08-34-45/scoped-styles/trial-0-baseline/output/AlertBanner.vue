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
  border-radius: 6px;
  border: 1px solid transparent;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

.alert-banner--warning {
  background-color: #fefce8;
  border-color: #fde047;
  color: #713f12;
}

.alert-banner--error {
  background-color: #fef2f2;
  border-color: #fca5a5;
  color: #7f1d1d;
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
  opacity: 0.6;
}

.alert-banner__dismiss:hover {
  opacity: 1;
}
</style>
