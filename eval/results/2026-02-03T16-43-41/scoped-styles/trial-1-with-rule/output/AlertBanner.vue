<template>
  <div v-if="visible" :class="['alert-banner', variant]">
    <span class="message">{{ message }}</span>
    <button class="dismiss-btn" @click="dismiss" aria-label="Dismiss">
      ×
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'warning',
    validator: (value) => ['warning', 'error'].includes(value)
  }
});

const emit = defineEmits(['dismiss']);

const visible = ref(true);

function dismiss() {
  visible.value = false;
  emit('dismiss');
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
}

.alert-banner.warning {
  background-color: #fef3cd;
  border: 1px solid #ffc107;
  color: #856404;
}

.alert-banner.error {
  background-color: #f8d7da;
  border: 1px solid #dc3545;
  color: #721c24;
}

.message {
  flex: 1;
}

.dismiss-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 0 0 12px;
  line-height: 1;
  opacity: 0.7;
}

.dismiss-btn:hover {
  opacity: 1;
}

.alert-banner.warning .dismiss-btn {
  color: #856404;
}

.alert-banner.error .dismiss-btn {
  color: #721c24;
}
</style>
