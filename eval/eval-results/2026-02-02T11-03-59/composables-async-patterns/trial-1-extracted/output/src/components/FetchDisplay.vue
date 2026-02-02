<script setup>
import { useFetch } from '../composables/useFetch'

const props = defineProps({
  url: { type: String, required: true },
})

const { data, error, loading } = useFetch(() => props.url)
</script>

<template>
  <div class="fetch-display">
    <div v-if="loading" class="spinner" role="status">Loading…</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <slot v-else :data="data">
      <pre>{{ data }}</pre>
    </slot>
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

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #c00;
}
</style>
