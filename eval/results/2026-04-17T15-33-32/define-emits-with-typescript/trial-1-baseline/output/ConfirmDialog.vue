<script setup>
defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

function onConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}

function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<template>
  <Transition name="fade">
    <div v-if="modelValue" class="confirm-dialog-overlay" @click.self="onCancel">
      <div class="confirm-dialog" role="dialog" aria-modal="true" :aria-labelledby="'confirm-dialog-title'">
        <h2 id="confirm-dialog-title" class="confirm-dialog-title">{{ title }}</h2>
        <p class="confirm-dialog-message">{{ message }}</p>
        <div class="confirm-dialog-actions">
          <button type="button" class="btn btn-cancel" @click="onCancel">
            {{ cancelText }}
          </button>
          <button type="button" class="btn btn-confirm" @click="onConfirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
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
  max-width: 90vw;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.confirm-dialog-title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
}

.confirm-dialog-message {
  margin: 0 0 1.5rem;
  color: #333;
}

.confirm-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-cancel {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #111;
}

.btn-confirm {
  background: #2563eb;
  color: #fff;
}

.btn-confirm:hover { background: #1d4ed8; }
.btn-cancel:hover { background: #e5e7eb; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
