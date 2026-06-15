<script setup>
import { useFetch } from '../composables/useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

// `() => props.url` keeps the fetch reactive: if the parent changes the
// `url` prop, the composable refetches automatically.
const { data, error, loading, refetch } = useFetch(() => props.url)
</script>

<template>
  <div class="data-view">
    <!-- Loading state -->
    <div v-if="loading" class="data-view__loading">
      <span class="spinner" aria-label="Loading" role="status"></span>
      <span>Loading…</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="data-view__error" role="alert">
      <p>Something went wrong: {{ error.message }}</p>
      <button type="button" @click="refetch">Retry</button>
    </div>

    <!-- Success state -->
    <div v-else-if="data" class="data-view__content">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<style scoped>
.data-view__loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.data-view__error {
  color: #b00020;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
