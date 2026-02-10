<script setup>
import { useFetch } from '../composables/useFetch.js';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const { data, error, isLoading, execute } = useFetch(props.url);
</script>

<template>
  <div class="fetch-display">
    <!-- Loading spinner -->
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner" />
      <p>Loading…</p>
    </div>

    <!-- Error message -->
    <div v-else-if="error" class="error-container">
      <p class="error-message">Error: {{ error }}</p>
      <button @click="execute">Retry</button>
    </div>

    <!-- Fetched data -->
    <div v-else-if="data" class="data-container">
      <slot :data="data">
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-container {
  padding: 1rem;
  border: 1px solid #f87171;
  border-radius: 8px;
  background: #fef2f2;
  text-align: center;
}

.error-message {
  color: #b91c1c;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 4px;
  background: #3b82f6;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

.data-container {
  padding: 1rem;
}

pre {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
