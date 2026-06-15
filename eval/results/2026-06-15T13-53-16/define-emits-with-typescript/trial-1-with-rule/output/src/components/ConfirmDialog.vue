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
  <div class="dialog-overlay" @click.self="emit('cancel')">
    <div class="dialog" role="dialog" aria-modal="true">
      <h2 class="dialog-title">{{ title }}</h2>
      <p class="dialog-message">{{ message }}</p>
      <div class="dialog-actions">
        <button type="button" class="btn btn-cancel" @click="emit('cancel')">
          {{ cancelText ?? 'Cancel' }}
        </button>
        <button type="button" class="btn btn-confirm" @click="emit('confirm')">
          {{ confirmText ?? 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.dialog {
  min-width: 320px;
  max-width: 90vw;
  padding: 1.5rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.dialog-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

.dialog-message {
  margin: 0 0 1.5rem;
  color: #444;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-cancel {
  background: #e5e7eb;
  color: #111;
}

.btn-confirm {
  background: #2563eb;
  color: #fff;
}
</style>
