<template>
  <div v-if="visible" :class="['alert-banner', `alert-banner--${variant}`]">
    <span class="alert-banner__message">{{ message }}</span>
    <button class="alert-banner__dismiss" @click="dismiss" aria-label="Dismiss alert">
      &times;
    </button>
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
  border-radius: 4px;
  font-size: 14px;
}

.alert-banner--warning {
  background-color: #fef3c7;
  border: 1px solid #f59e0b;
  color: #92400e;
}

.alert-banner--error {
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #991b1b;
}

.alert-banner__message {
  flex: 1;
}

.alert-banner__dismiss {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 12px;
  padding: 0 4px;
  line-height: 1;
  color: inherit;
  opacity: 0.7;
}

.alert-banner__dismiss:hover {
  opacity: 1;
}
</style>
