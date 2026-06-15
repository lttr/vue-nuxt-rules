<script setup>
const props = defineProps({
  // Controls visibility; use with v-model for two-way binding.
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
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="confirm-dialog__overlay"
      @click.self="onCancel"
    >
      <div
        class="confirm-dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <h2 class="confirm-dialog__title">{{ title }}</h2>

        <p v-if="message" class="confirm-dialog__message">{{ message }}</p>
        <!-- Fallback slot lets the parent supply richer body content. -->
        <slot v-else />

        <div class="confirm-dialog__actions">
          <button
            type="button"
            class="confirm-dialog__btn confirm-dialog__btn--cancel"
            @click="onCancel"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="confirm-dialog__btn confirm-dialog__btn--confirm"
            @click="onConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
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
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.95rem;
}

.confirm-dialog__btn--cancel {
  background: #f1f1f1;
  border-color: #d0d0d0;
  color: #333;
}

.confirm-dialog__btn--confirm {
  background: #2563eb;
  color: #fff;
}

.confirm-dialog__btn--confirm:hover {
  background: #1d4ed8;
}
</style>
