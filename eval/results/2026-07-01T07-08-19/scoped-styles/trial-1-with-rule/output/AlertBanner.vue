<template>
  <div v-if="visible" class="alert-banner" :class="variant">
    <span class="message">{{ message }}</span>
    <button class="dismiss-btn" aria-label="Dismiss" @click="dismiss">&times;</button>
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
    validator: (value) => ['warning', 'error'].includes(value),
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
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid transparent;
  font-family: sans-serif;
  font-size: 14px;
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
}

.dismiss-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  margin-left: 12px;
  color: inherit;
  opacity: 0.7;
}

.dismiss-btn:hover {
  opacity: 1;
}
</style>
