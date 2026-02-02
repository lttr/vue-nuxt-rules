<template>
  <div v-if="visible" :class="['alert-banner', variant]">
    <span class="alert-message">{{ message }}</span>
    <button class="alert-dismiss" @click="dismiss">&times;</button>
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
  margin-right: 12px;
}

.alert-dismiss {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  color: inherit;
  opacity: 0.7;
}

.alert-dismiss:hover {
  opacity: 1;
}
</style>
