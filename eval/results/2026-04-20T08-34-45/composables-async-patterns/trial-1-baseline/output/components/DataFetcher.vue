<template>
  <div class="data-fetcher">
    <div v-if="loading" class="spinner" aria-label="Loading">
      <span class="spinner-icon" />
      <span>Loading…</span>
    </div>

    <div v-else-if="error" class="error" role="alert">
      Error: {{ error }}
    </div>

    <div v-else-if="data" class="content">
      <slot :data="data">
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      </slot>
    </div>
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

const { data, error, loading } = useFetch(props.url)
</script>

<style scoped>
.data-fetcher {
  font-family: sans-serif;
  padding: 1rem;
}

.spinner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
}

.spinner-icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 3px solid #ccc;
  border-top-color: #555;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #c0392b;
  background: #fdecea;
  border: 1px solid #f5c6c2;
  border-radius: 4px;
  padding: 0.75rem 1rem;
}

.content pre {
  background: #f4f4f4;
  border-radius: 4px;
  padding: 1rem;
  overflow: auto;
}
</style>
