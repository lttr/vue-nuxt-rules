<script setup>
import { useFetch } from '../composables/useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, loading, error } = useFetch(() => props.url)
</script>

<template>
  <div class="fetch-display">
    <div v-if="loading" class="spinner" role="status">
      <span>Loading…</span>
    </div>

    <div v-else-if="error" class="error" role="alert">
      Error: {{ error }}
    </div>

    <pre v-else-if="data">{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<style scoped>
.spinner {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.spinner span {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #c00;
}
</style>
