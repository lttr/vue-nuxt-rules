<script setup>
import { useFetch } from './useFetch.js';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const { data, error, loading, refetch } = useFetch(() => props.url);
</script>

<template>
  <div class="data-fetcher">
    <!-- Loading spinner -->
    <div v-if="loading" class="spinner-container">
      <div class="spinner" />
      <p>Loading...</p>
    </div>

    <!-- Error message -->
    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
      <button @click="refetch">Retry</button>
    </div>

    <!-- Fetched data -->
    <div v-else-if="data" class="data">
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
  border: 4px solid #ccc;
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
  color: #c00;
  padding: 1rem;
  border: 1px solid #c00;
  border-radius: 4px;
  background: #fff0f0;
}

.error button {
  margin-top: 0.5rem;
  cursor: pointer;
}

.data pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow: auto;
}
</style>
