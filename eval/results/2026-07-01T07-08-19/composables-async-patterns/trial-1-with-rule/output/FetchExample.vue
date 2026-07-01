<script setup>
import { useFetch } from './useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, loading, error } = useFetch(() => props.url)
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <pre v-else-if="data">{{ data }}</pre>
  </div>
</template>
