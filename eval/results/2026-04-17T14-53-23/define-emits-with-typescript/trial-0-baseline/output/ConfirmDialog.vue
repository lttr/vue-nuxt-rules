<script setup>
defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="dialog-overlay" @click.self="emit('cancel')">
      <div class="dialog" role="dialog" aria-modal="true" :aria-labelledby="`${$.uid}-title`">
        <h2 :id="`${$.uid}-title`" class="dialog-title">{{ title }}</h2>
        <p class="dialog-message">{{ message }}</p>
        <div class="dialog-actions">
          <button type="button" class="btn btn-cancel" @click="emit('cancel')">
            {{ cancelText }}
          </button>
          <button type="button" class="btn btn-confirm" @click="emit('confirm')">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dialog-overlay {
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
  padding: 1.5rem;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.dialog-title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
}

.dialog-message {
  margin: 0 0 1.5rem;
  color: #444;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  font: inherit;
}

.btn-cancel {
  background: #f2f2f2;
  border-color: #ddd;
}

.btn-confirm {
  background: #2563eb;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
