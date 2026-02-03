<script setup>
import { useFetch } from '../composables/useFetch'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, error, loading } = useFetch(() => props.url)
</script>

<template>
  <div class="fetch-display">
    <div v-if="loading" class="spinner" role="status">
      <span>Loading…</span>
    </div>
    <div v-else-if="error" class="error">
      Error: {{ error }}
    </div>
    <slot v-else :data="data">
      <pre>{{ data }}</pre>
    </slot>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner::before {
  content: '';
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #dc3545;
}
</style>
