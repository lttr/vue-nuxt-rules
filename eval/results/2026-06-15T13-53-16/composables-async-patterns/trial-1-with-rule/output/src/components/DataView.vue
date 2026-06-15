<script setup>
import { useFetch } from '../composables/useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

// Pass a getter so the request re-runs whenever `props.url` changes.
const { data, loading, error } = useFetch(() => props.url)
</script>

<template>
  <div class="data-view">
    <div v-if="loading" class="spinner" role="status" aria-live="polite">
      <span class="spinner__circle" aria-hidden="true"></span>
      <span class="spinner__label">Loading…</span>
    </div>

    <p v-else-if="error" class="error" role="alert">
      Something went wrong: {{ error.message }}
    </p>

    <pre v-else-if="data" class="data">{{ data }}</pre>
  </div>
</template>

<style scoped>
.spinner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner__circle {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #b00020;
}
</style>
