<script setup lang="ts">
defineProps<{
  message: string
  variant?: 'warning' | 'error'
}>()

const emit = defineEmits<{
  dismiss: []
}>()
</script>

<template>
  <div class="alert-banner" :class="variant ?? 'warning'">
    <span class="message">{{ message }}</span>
    <button class="dismiss-btn" @click="emit('dismiss')" aria-label="Dismiss">
      ×
    </button>
  </div>
</template>

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

.message {
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
  opacity: 0.7;
  transition: opacity 0.2s;
}

.dismiss-btn:hover {
  opacity: 1;
}

.warning .dismiss-btn {
  color: #92400e;
}

.error .dismiss-btn {
  color: #991b1b;
}
</style>
