<script setup>
import { useFetch } from './useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, error, isLoading, refetch } = useFetch(() => props.url)
</script>

<template>
  <div class="data-viewer">
    <div v-if="isLoading" class="spinner" role="status" aria-label="Loading">
      <div class="spinner-circle"></div>
      <span class="sr-only">Loading…</span>
    </div>

    <div v-else-if="error" class="error" role="alert">
      <p>Something went wrong: {{ error.message }}</p>
      <button type="button" @click="refetch">Try again</button>
    </div>

    <pre v-else-if="data" class="data">{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<style scoped>
.data-viewer {
  font-family: system-ui, sans-serif;
}

.spinner {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.spinner-circle {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.error {
  color: #b91c1c;
  background: #fee2e2;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
}

.error button {
  margin-top: 0.5rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid #b91c1c;
  background: white;
  border-radius: 0.25rem;
  cursor: pointer;
}

.data {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
}
</style>
