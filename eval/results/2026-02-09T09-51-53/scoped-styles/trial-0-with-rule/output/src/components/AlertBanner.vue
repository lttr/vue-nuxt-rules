<template>
  <div v-if="visible" :class="['alert-banner', `alert-banner--${variant}`]" role="alert">
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
  line-height: 1.4;
}

.alert-banner--warning {
  background-color: #fef3cd;
  color: #856404;
  border: 1px solid #ffc107;
}

.alert-banner--error {
  background-color: #f8d7da;
  color: #842029;
  border: 1px solid #dc3545;
}

.alert-banner__message {
  flex: 1;
  margin-right: 12px;
}

.alert-banner__dismiss {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  color: inherit;
  opacity: 0.7;
}

.alert-banner__dismiss:hover {
  opacity: 1;
}
</style>
