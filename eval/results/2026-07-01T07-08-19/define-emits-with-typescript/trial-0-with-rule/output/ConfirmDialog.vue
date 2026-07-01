<template>
  <div v-if="modelValue" class="confirm-dialog-overlay">
    <div class="confirm-dialog">
      <h2 class="confirm-dialog__title">{{ title }}</h2>
      <p class="confirm-dialog__message">{{ message }}</p>
      <div class="confirm-dialog__actions">
        <button type="button" class="confirm-dialog__button confirm-dialog__button--cancel" @click="onCancel">
          Cancel
        </button>
        <button type="button" class="confirm-dialog__button confirm-dialog__button--confirm" @click="onConfirm">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
  'update:modelValue': [value: boolean]
}>()

function onConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}

function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.confirm-dialog-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.confirm-dialog {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 320px;
  max-width: 480px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.confirm-dialog__title {
  margin: 0 0 12px;
  font-size: 1.2rem;
  font-weight: 600;
}

.confirm-dialog__message {
  margin: 0 0 20px;
  color: #333;
}

.confirm-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.confirm-dialog__button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
}

.confirm-dialog__button--cancel {
  background: #e5e7eb;
  color: #111;
}

.confirm-dialog__button--confirm {
  background: #dc2626;
  color: #fff;
}
</style>
