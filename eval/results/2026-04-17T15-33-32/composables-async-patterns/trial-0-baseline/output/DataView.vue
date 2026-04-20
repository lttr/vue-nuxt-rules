<script setup>
import { useFetch } from './useFetch.js'

const props = defineProps({
  url: { type: String, required: true },
})

const { data, error, isLoading, refetch } = useFetch(() => props.url)
</script>

<template>
  <div class="data-view">
    <div v-if="isLoading" class="spinner" role="status" aria-label="Loading">
      <div class="spinner__circle"></div>
    </div>

    <div v-else-if="error" class="error" role="alert">
      <p>Failed to load data: {{ error.message }}</p>
      <button type="button" @click="refetch">Retry</button>
    </div>

    <pre v-else class="data">{{ data }}</pre>
  </div>
</template>

<style scoped>
.data-view {
  min-height: 4rem;
}

.spinner {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.spinner__circle {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e0e0e0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #b91c1c;
  background: #fee2e2;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
}

.error button {
  margin-top: 0.5rem;
}

.data {
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 0.375rem;
  overflow-x: auto;
}
</style>
