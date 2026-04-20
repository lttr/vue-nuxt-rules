<template>
  <div v-if="visible" class="alert-banner" :class="variant" role="alert">
    <span class="message">{{ message }}</span>
    <button class="dismiss" aria-label="Dismiss" @click="dismiss">&times;</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'warning',
    validator: (v) => ['warning', 'error'].includes(v),
  },
})

const emit = defineEmits(['dismiss'])

const visible = ref(true)

function dismiss() {
  visible.value = false
  emit('dismiss')
}
</script>

<style scoped>
.alert-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  font-family: sans-serif;
  font-size: 0.95rem;
}

.alert-banner.warning {
  background-color: #fff3cd;
  border-color: #ffe69c;
  color: #664d03;
}

.alert-banner.error {
  background-color: #f8d7da;
  border-color: #f1aeb5;
  color: #842029;
}

.message {
  flex: 1;
  margin-right: 0.75rem;
}

.dismiss {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.25rem;
}

.dismiss:hover {
  opacity: 0.7;
}
</style>
