<template>
  <div class="data-fetcher">
    <div v-if="loading" class="spinner" aria-label="Loading" />

    <div v-else-if="error" class="error" role="alert">
      Error: {{ error }}
    </div>

    <slot v-else :data="data" />
  </div>
</template>

<script setup>
import { useFetch } from '../composables/useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, error, loading } = useFetch(() => props.url)
</script>

<style scoped>
.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #dc2626;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
}
</style>
