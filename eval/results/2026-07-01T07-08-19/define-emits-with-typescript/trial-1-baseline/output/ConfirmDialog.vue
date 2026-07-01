<template>
  <div v-if="modelValue" class="confirm-dialog-overlay" @click.self="cancel">
    <div class="confirm-dialog" role="dialog" aria-modal="true" :aria-label="title">
      <h2 class="confirm-dialog-title">{{ title }}</h2>
      <p class="confirm-dialog-message">{{ message }}</p>
      <div class="confirm-dialog-actions">
        <button type="button" class="confirm-dialog-cancel" @click="cancel">
          {{ cancelText }}
        </button>
        <button type="button" class="confirm-dialog-confirm" @click="confirm">
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

function confirm() {
  emit('confirm')
  emit('update:modelValue', false)
}

function cancel() {
  emit('cancel')
  emit('update:modelValue', false)
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
  gap: 8px;
}

.confirm-dialog-actions button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 0.9rem;
}

.confirm-dialog-cancel {
  background: #fff;
}

.confirm-dialog-confirm {
  background: #d32f2f;
  color: #fff;
  border-color: #d32f2f;
}
</style>
