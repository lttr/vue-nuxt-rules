<script setup>
import { useFetch } from './useFetch'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, error, isLoading, refetch } = useFetch(() => props.url)
</script>

<template>
  <div class="fetch-example">
    <div v-if="isLoading" class="spinner" role="status" aria-label="Loading">
      Loading...
    </div>

    <div v-else-if="error" class="error-message" role="alert">
      Failed to load data: {{ error.message }}
      <button @click="refetch">Retry</button>
    </div>

    <pre v-else-if="data">{{ data }}</pre>
  </div>
</template>

<style scoped>
.spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  color: #b00020;
}
</style>
