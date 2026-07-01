<script setup>
import { useFetch } from './useFetch.js'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const { data, error, isLoading, refresh } = useFetch(() => props.url)
</script>

<template>
  <div>
    <p v-if="isLoading">Loading...</p>

    <p v-else-if="error">
      Something went wrong: {{ error.message }}
      <button @click="refresh">Retry</button>
    </p>

    <pre v-else-if="data">{{ data }}</pre>
  </div>
</template>
