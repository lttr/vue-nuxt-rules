<script setup>
import { useFetch } from '../composables/useFetch'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

// Pass a getter so the fetch re-runs whenever `props.url` changes.
const { data, loading, error } = useFetch(() => props.url)
</script>

<template>
  <div class="data-view">
    <!-- Loading spinner while the request is in flight -->
    <div v-if="loading" class="spinner" role="status" aria-label="Loading">
      <span class="visually-hidden">Loading…</span>
    </div>

    <!-- Error message if the request fails -->
    <p v-else-if="error" class="error" role="alert">
      Something went wrong: {{ error.message }}
    </p>

    <!-- Fetched data -->
    <pre v-else-if="data" class="data">{{ data }}</pre>
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
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #b00020;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
