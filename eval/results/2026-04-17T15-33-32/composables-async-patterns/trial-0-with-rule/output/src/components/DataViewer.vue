<script setup>
import { ref } from 'vue'
import { useFetch } from '../composables/useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const urlRef = ref(props.url)
const { data, loading, error } = useFetch(urlRef)
</script>

<template>
  <div class="data-viewer">
    <div v-if="loading" class="spinner" role="status" aria-label="Loading">
      <span class="spinner__circle"></span>
      <span class="spinner__text">Loading…</span>
    </div>

    <div v-else-if="error" class="error" role="alert">
      <p>Something went wrong: {{ error.message }}</p>
    </div>

    <pre v-else-if="data" class="data">{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<style scoped>
.data-viewer {
  font-family: system-ui, sans-serif;
}

.spinner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner__circle {
  width: 1rem;
  height: 1rem;
  border: 2px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #b00020;
}

.data {
  background: #f4f4f4;
  padding: 0.75rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
