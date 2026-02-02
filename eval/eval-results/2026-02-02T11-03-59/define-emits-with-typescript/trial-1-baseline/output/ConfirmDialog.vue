<template>
  <Teleport to="body">
    <div v-if="visible" class="confirm-dialog-overlay" @click.self="cancel">
      <div class="confirm-dialog" role="dialog" aria-modal="true">
        <h2 class="confirm-dialog-title">{{ title }}</h2>
        <p class="confirm-dialog-message">{{ message }}</p>
        <div class="confirm-dialog-actions">
          <button class="btn btn-cancel" @click="cancel">{{ cancelText }}</button>
          <button class="btn btn-confirm" @click="confirm">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Confirm',
  },
  message: {
    type: String,
    default: 'Are you sure?',
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
})

const emit = defineEmits(['confirm', 'cancel'])

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
}
</script>

<style scoped>
.confirm-dialog-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.confirm-dialog {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 320px;
  max-width: 480px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.confirm-dialog-title {
  margin: 0 0 12px;
  font-size: 1.25rem;
}

.confirm-dialog-message {
  margin: 0 0 24px;
  color: #555;
}

.confirm-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-cancel {
  background: #e5e7eb;
  color: #374151;
}

.btn-confirm {
  background: #3b82f6;
  color: #fff;
}
</style>
