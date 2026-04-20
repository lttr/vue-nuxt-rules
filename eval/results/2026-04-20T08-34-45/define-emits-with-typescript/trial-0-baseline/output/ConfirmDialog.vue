<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="onCancel">
      <div class="dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId">
        <h2 :id="titleId" class="title">{{ title }}</h2>
        <p class="message">{{ message }}</p>
        <div class="actions">
          <button class="btn btn-cancel" @click="onCancel">{{ cancelLabel }}</button>
          <button class="btn btn-confirm" @click="onConfirm">{{ confirmLabel }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
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
  confirmLabel: {
    type: String,
    default: 'Confirm',
  },
  cancelLabel: {
    type: String,
    default: 'Cancel',
  },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const titleId = computed(() => `confirm-dialog-title-${Math.random().toString(36).slice(2)}`)

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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 320px;
  max-width: 480px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.title {
  margin: 0 0 12px;
  font-size: 1.2rem;
  font-weight: 600;
}

.message {
  margin: 0 0 24px;
  color: #555;
  line-height: 1.5;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
}

.btn-cancel {
  background: #e5e7eb;
  color: #374151;
}

.btn-cancel:hover {
  background: #d1d5db;
}

.btn-confirm {
  background: #2563eb;
  color: #fff;
}

.btn-confirm:hover {
  background: #1d4ed8;
}
</style>
