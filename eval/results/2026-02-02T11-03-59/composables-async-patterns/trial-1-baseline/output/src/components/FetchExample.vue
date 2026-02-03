<script setup>
import { useFetch } from '../composables/useFetch'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, error, loading, retry } = useFetch(() => props.url)
</script>

<template>
  <div class="fetch-container">
    <div v-if="loading" class="spinner" role="status">
      <span class="sr-only">Loading…</span>
    </div>

    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
      <button @click="retry">Retry</button>
    </div>

    <slot v-else :data="data" />
  </div>
</template>

<style scoped>
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #dc2626;
  text-align: center;
}

.error button {
  margin-top: 0.5rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid #dc2626;
  border-radius: 4px;
  background: transparent;
  color: #dc2626;
  cursor: pointer;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
