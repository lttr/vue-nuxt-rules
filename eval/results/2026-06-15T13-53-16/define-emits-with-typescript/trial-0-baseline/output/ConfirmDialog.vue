<script setup>
defineProps({
  title: {
    type: String,
    default: 'Confirm',
  },
  message: {
    type: String,
    default: '',
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
</script>

<template>
  <div class="confirm-dialog__overlay" @click.self="emit('cancel')">
    <div
      class="confirm-dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @keydown.esc="emit('cancel')"
    >
      <h2 class="confirm-dialog__title">{{ title }}</h2>
      <p class="confirm-dialog__message">{{ message }}</p>
      <div class="confirm-dialog__actions">
        <button type="button" class="confirm-dialog__btn" @click="emit('cancel')">
          {{ cancelText }}
        </button>
        <button
          type="button"
          class="confirm-dialog__btn confirm-dialog__btn--primary"
          @click="emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-dialog__overlay {
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
  padding: 1.5rem;
  width: 100%;
  max-width: 24rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.confirm-dialog__title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
}

.confirm-dialog__message {
  margin: 0 0 1.5rem;
  color: #444;
}

.confirm-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.confirm-dialog__btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 0.95rem;
}

.confirm-dialog__btn--primary {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.confirm-dialog__btn--primary:hover {
  background: #1d4ed8;
}
</style>
