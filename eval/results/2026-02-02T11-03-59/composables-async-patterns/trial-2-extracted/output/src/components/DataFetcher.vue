<script setup>
import { useFetch } from '../composables/useFetch'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, error, loading } = useFetch(() => props.url)
</script>

<template>
  <div class="data-fetcher">
    <div v-if="loading" class="spinner" role="status">Loading...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <slot v-else :data="data" />
  </div>
</template>

<style scoped>
.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
  border: 3px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  text-indent: -9999px;
  overflow: hidden;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #e53e3e;
}
</style>
