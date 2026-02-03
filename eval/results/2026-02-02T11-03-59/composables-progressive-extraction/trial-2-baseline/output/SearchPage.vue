<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let abortController = null

async function fetchResults(searchQuery) {
  if (abortController) {
    abortController.abort()
  }

  if (!searchQuery.trim()) {
    results.value = []
    return
  }

  abortController = new AbortController()
  loading.value = true
  error.value = null

  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(searchQuery)}`,
      { signal: abortController.signal }
    )
    if (!response.ok) throw new Error(`Request failed (${response.status})`)
    results.value = await response.json()
  } catch (err) {
    if (err.name !== 'AbortError') {
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
}

let debounceTimer = null

watch(query, (value) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => fetchResults(value), 300)
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
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-else-if="results.length">
      <li v-for="item in results" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <p v-else-if="query.trim()">No results found.</p>
  </div>
</template>
