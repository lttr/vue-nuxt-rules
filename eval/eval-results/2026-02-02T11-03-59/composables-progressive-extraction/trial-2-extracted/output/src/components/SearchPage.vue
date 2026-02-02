<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let abortController = null

watch(query, async (newQuery) => {
  if (abortController) {
    abortController.abort()
  }

  const trimmed = newQuery.trim()
  if (!trimmed) {
    results.value = []
    error.value = null
    return
  }

  abortController = new AbortController()
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
      signal: abortController.signal,
    })
    if (!response.ok) {
      throw new Error(`Search failed (${response.status})`)
    }
    results.value = await response.json()
  } catch (err) {
    if (err.name !== 'AbortError') {
      error.value = err.message
      results.value = []
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="search-page">
    <input
      v-model="query"
      type="search"
      placeholder="Search..."
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else-if="results.length">
      <li v-for="item in results" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
    <p v-else-if="query.trim()">No results found.</p>
  </div>
</template>
