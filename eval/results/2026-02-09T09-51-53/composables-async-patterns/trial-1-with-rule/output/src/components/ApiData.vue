<script setup>
import { useApiFetch } from '../composables/useApiFetch'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, loading, error } = useApiFetch(() => props.url)
</script>

<template>
  <div class="api-data">
    <div v-if="loading" class="spinner" role="status">
      <span>Loading...</span>
    </div>

    <div v-else-if="error" class="error">
      Error: {{ error }}
    </div>

    <div v-else-if="data">
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

.spinner::before {
  content: '';
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #dc3545;
  padding: 8px 12px;
  background: #f8d7da;
  border-radius: 4px;
}
</style>
