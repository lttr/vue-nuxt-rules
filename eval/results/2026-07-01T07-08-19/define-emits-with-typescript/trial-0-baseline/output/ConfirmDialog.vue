<template>
  <div v-if="modelValue" class="confirm-dialog-overlay" @click.self="onCancel">
    <div class="confirm-dialog" role="dialog" aria-modal="true" :aria-label="title">
      <h2 class="confirm-dialog-title">{{ title }}</h2>
      <p class="confirm-dialog-message">{{ message }}</p>
      <div class="confirm-dialog-actions">
        <button type="button" class="confirm-dialog-btn confirm-dialog-btn-cancel" @click="onCancel">
          {{ cancelText }}
        </button>
        <button type="button" class="confirm-dialog-btn confirm-dialog-btn-confirm" @click="onConfirm">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
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

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

function onConfirm() {
  emit('update:modelValue', false)
  emit('confirm')
}

function onCancel() {
  emit('update:modelValue', false)
  emit('cancel')
}
</script>

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
  padding: 24px;
  min-width: 320px;
  max-width: 480px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.confirm-dialog-title {
  margin: 0 0 12px;
  font-size: 1.25rem;
  font-weight: 600;
}

.confirm-dialog-message {
  margin: 0 0 20px;
  color: #333;
}

.confirm-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.confirm-dialog-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
}

.confirm-dialog-btn-cancel {
  background: #e5e7eb;
  color: #111;
}

.confirm-dialog-btn-confirm {
  background: #dc2626;
  color: #fff;
}
</style>
