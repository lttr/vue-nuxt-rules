<script setup>
import { useFetch } from '../composables/useFetch'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, error, isLoading, retry } = useFetch(() => props.url)
</script>

<template>
  <div class="data-fetcher">
    <div v-if="isLoading" class="spinner" role="status">
      <span class="spinner-circle" />
      <span>Loading...</span>
    </div>

    <div v-else-if="error" class="error" role="alert">
      <p>Error: {{ error }}</p>
      <button @click="retry">Retry</button>
    </div>

    <slot v-else :data="data" />
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner-circle {
  width: 20px;
  height: 20px;
  border: 3px solid #e0e0e0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #dc2626;
}

.error button {
  margin-top: 8px;
  padding: 4px 12px;
  cursor: pointer;
}
</style>
