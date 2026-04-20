<script setup>
import { useFetch } from '../composables/useFetch.js'

const props = defineProps({
  url: { type: String, required: true }
})

const { data, error, loading } = useFetch(() => props.url)
</script>

<template>
  <div class="data-viewer">
    <div v-if="loading" class="spinner" role="status" aria-live="polite">
      <span class="spinner-circle"></span>
      <span class="spinner-label">Loading...</span>
    </div>

    <div v-else-if="error" class="error" role="alert">
      Failed to load data: {{ error.message }}
    </div>

    <pre v-else-if="data" class="data">{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<style scoped>
.spinner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.spinner-circle {
  width: 1rem;
  height: 1rem;
  border: 2px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.error {
  color: #b00020;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
