<template>
  <div v-if="visible" class="overlay" @click.self="cancel">
    <div class="dialog">
      <h2 class="title">{{ title }}</h2>
      <p class="message">{{ message }}</p>
      <div class="actions">
        <button class="btn btn-cancel" @click="cancel">{{ cancelText }}</button>
        <button class="btn btn-confirm" @click="confirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    default: 'Are you sure?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
});

const emit = defineEmits(['confirm', 'cancel']);

function confirm() {
  emit('confirm');
}

function cancel() {
  emit('cancel');
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: white;
  border-radius: 8px;
  padding: 24px;
  min-width: 300px;
  max-width: 450px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.title {
  margin: 0 0 12px 0;
  font-size: 1.25rem;
  color: #333;
}

.message {
  margin: 0 0 24px 0;
  color: #666;
  line-height: 1.5;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-cancel {
  background: #e0e0e0;
  color: #333;
}

.btn-confirm {
  background: #3b82f6;
  color: white;
}
</style>
