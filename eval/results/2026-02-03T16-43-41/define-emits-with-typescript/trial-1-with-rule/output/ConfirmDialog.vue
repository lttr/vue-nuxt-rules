<script setup lang="ts">
defineProps<{
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <div class="modal-overlay" @click.self="emit('cancel')">
    <div class="modal">
      <h2 class="modal-title">{{ title }}</h2>
      <p class="modal-message">{{ message }}</p>
      <div class="modal-actions">
        <button class="btn btn-cancel" @click="emit('cancel')">
          {{ cancelText ?? 'Cancel' }}
        </button>
        <button class="btn btn-confirm" @click="emit('confirm')">
          {{ confirmText ?? 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-title {
  margin: 0 0 12px;
  font-size: 1.25rem;
}

.modal-message {
  margin: 0 0 24px;
  color: #666;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-cancel {
  background: #e5e7eb;
  color: #374151;
}

.btn-confirm {
  background: #3b82f6;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
