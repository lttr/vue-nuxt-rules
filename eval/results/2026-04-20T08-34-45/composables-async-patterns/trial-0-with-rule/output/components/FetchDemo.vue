<template>
  <div class="fetch-demo">
    <div v-if="loading" class="spinner" aria-label="Loading">
      <span class="spinner__icon" />
      <span>Loading...</span>
    </div>

    <div v-else-if="error" class="error" role="alert">
      Error: {{ error }}
    </div>

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
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner__icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #c00;
}

.data {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow: auto;
}
</style>
