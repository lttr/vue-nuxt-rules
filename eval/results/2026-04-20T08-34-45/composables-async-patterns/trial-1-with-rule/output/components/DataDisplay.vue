<template>
  <div class="data-display">
    <div v-if="loading" class="spinner" aria-label="Loading…" />

    <p v-else-if="error" class="error" role="alert">{{ error }}</p>

    <pre v-else-if="data" class="data">{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '../composables/useFetch.js'

const url = ref('https://jsonplaceholder.typicode.com/todos/1')
const { data, loading, error } = useFetch(url)
</script>

<style scoped>
.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #dc2626;
  font-weight: 500;
}

.data {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  overflow: auto;
}
</style>
