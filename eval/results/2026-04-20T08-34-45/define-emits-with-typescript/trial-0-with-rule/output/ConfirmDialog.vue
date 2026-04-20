<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" @click.self="onCancel">
      <div class="dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId">
        <h2 :id="titleId" class="title">{{ title }}</h2>
        <p class="message">{{ message }}</p>
        <div class="actions">
          <button class="btn btn-cancel" @click="onCancel">Cancel</button>
          <button class="btn btn-confirm" @click="onConfirm">Confirm</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

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
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.title {
  margin: 0 0 12px;
  font-size: 1.25rem;
}

.message {
  margin: 0 0 24px;
  color: #555;
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
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-cancel {
  background: #e5e7eb;
  color: #374151;
}

.btn-cancel:hover {
  background: #d1d5db;
}

.btn-confirm {
  background: #3b82f6;
  color: #fff;
}

.btn-confirm:hover {
  background: #2563eb;
}
</style>
