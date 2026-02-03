<template>
  <div v-if="visible" :class="['alert-banner', variant]">
    <span class="alert-message">{{ message }}</span>
    <button class="dismiss-btn" @click="dismiss" aria-label="Dismiss">✕</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
  border-radius: 6px;
  font-size: 14px;
}

.alert-banner.warning {
  background-color: #fef3c7;
  border: 1px solid #f59e0b;
  color: #92400e;
}

.alert-banner.error {
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #991b1b;
}

.alert-message {
  flex: 1;
}

.dismiss-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  color: inherit;
}

.dismiss-btn:hover {
  opacity: 0.7;
}
</style>
