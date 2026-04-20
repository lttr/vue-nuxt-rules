<script setup lang="ts">
defineProps<{
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div class="confirm-dialog-overlay" @click.self="emit('cancel')">
    <div class="confirm-dialog" role="dialog" aria-modal="true">
      <h2 class="confirm-dialog__title">{{ title }}</h2>
      <p class="confirm-dialog__message">{{ message }}</p>
      <div class="confirm-dialog__actions">
        <button type="button" class="confirm-dialog__btn" @click="emit('cancel')">
          {{ cancelText ?? 'Cancel' }}
        </button>
        <button
          type="button"
          class="confirm-dialog__btn confirm-dialog__btn--primary"
          @click="emit('confirm')"
        >
          {{ confirmText ?? 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-dialog {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 320px;
  max-width: 480px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.confirm-dialog__title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
}

.confirm-dialog__message {
  margin: 0 0 1.5rem;
  color: #333;
}

.confirm-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.confirm-dialog__btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-dialog__btn--primary {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}
</style>
