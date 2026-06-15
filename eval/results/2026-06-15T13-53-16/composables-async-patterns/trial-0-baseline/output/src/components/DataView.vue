<script setup>
import { useFetch } from '../composables/useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

// `() => props.url` keeps the fetch reactive: changing the prop refetches.
const { data, error, loading, refetch } = useFetch(() => props.url)
</script>

<template>
  <div class="data-view">
    <!-- Loading state -->
    <div v-if="loading" class="data-view__loading" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <span>Loading…</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="data-view__error" role="alert">
      <p>Something went wrong: {{ error.message }}</p>
      <button type="button" @click="refetch">Try again</button>
    </div>

    <!-- Success state -->
    <div v-else class="data-view__content">
      <slot :data="data">
        <pre>{{ data }}</pre>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.data-view__loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #ccc;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.data-view__error {
  color: #b91c1c;
}

.data-view__error button {
  margin-top: 0.5rem;
  cursor: pointer;
}
</style>
