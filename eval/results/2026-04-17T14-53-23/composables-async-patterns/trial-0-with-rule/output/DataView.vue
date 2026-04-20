<script setup>
import { useFetch } from './useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, loading, error } = useFetch(() => props.url)
</script>

<template>
  <div class="data-view">
    <div v-if="loading" class="spinner" role="status" aria-label="Loading">
      <span class="sr-only">Loading...</span>
    </div>

    <div v-else-if="error" class="error" role="alert">
      Failed to load data: {{ error.message }}
    </div>

    <pre v-else-if="data">{{ data }}</pre>
  </div>
</template>

<style scoped>
.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #ccc;
  border-top-color: #333;
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
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.error {
  color: #b00020;
}
</style>
