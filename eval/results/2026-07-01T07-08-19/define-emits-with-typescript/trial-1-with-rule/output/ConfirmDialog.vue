<template>
  <div v-if="modelValue" class="overlay" @click.self="onCancel">
    <div class="dialog" role="dialog" aria-modal="true">
      <h2 class="dialog__title">{{ title }}</h2>
      <p class="dialog__message">{{ message }}</p>
      <div class="dialog__actions">
        <button type="button" class="btn btn--cancel" @click="onCancel">Cancel</button>
        <button type="button" class="btn btn--confirm" @click="onConfirm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    message?: string
  }>(),
  {
    title: 'Confirm',
    message: 'Are you sure?',
  }
)

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
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.dialog__title {
  margin: 0 0 12px;
  font-size: 1.25rem;
  font-weight: 600;
}

.dialog__message {
  margin: 0 0 20px;
  color: #333;
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn--cancel {
  background: #e5e7eb;
  color: #111;
}

.btn--confirm {
  background: #dc2626;
  color: #fff;
}
</style>
