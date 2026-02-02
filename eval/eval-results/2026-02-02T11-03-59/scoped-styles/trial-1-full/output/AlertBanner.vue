<template>
  <div v-if="visible" :class="['alert-banner', variant]">
    <span class="alert-message">{{ message }}</span>
    <button class="dismiss-btn" @click="dismiss" aria-label="Dismiss alert">
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
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
}

.alert-banner.warning {
  background-color: #fef3cd;
  border: 1px solid #ffc107;
  color: #664d03;
}

.alert-banner.error {
  background-color: #f8d7da;
  border: 1px solid #dc3545;
  color: #842029;
}

.alert-message {
  flex: 1;
  margin-right: 12px;
}

.dismiss-btn {
  background: none;
  border: none;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
  color: inherit;
  opacity: 0.7;
}

.dismiss-btn:hover {
  opacity: 1;
}
</style>
