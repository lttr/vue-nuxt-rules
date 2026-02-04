<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'

const props = defineProps<{
  url: string
}>()

const { data, loading, error } = useFetch(props.url)
</script>

<template>
  <div class="data-fetcher">
    <div v-if="loading" class="spinner">
      <span class="spinner-icon"></span>
      Loading...
    </div>

    <div v-else-if="error" class="error">
      Error: {{ error.message }}
    </div>

    <div v-else-if="data" class="data">
      <slot :data="data">
        <pre>{{ data }}</pre>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner-icon {
  width: 16px;
  height: 16px;
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
  color: #dc3545;
  padding: 8px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background: #f8d7da;
}

.data {
  padding: 8px;
}
</style>
