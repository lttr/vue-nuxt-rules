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
      `/api/search?q=${encodeURIComponent(searchQuery.trim())}`,
      { signal: abortController.signal }
    )
    if (!response.ok) {
      throw new Error(`Search failed (${response.status})`)
    }
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
      class="search-input"
    />

    <p v-if="loading" class="search-status">Loading...</p>
    <p v-else-if="error" class="search-error">{{ error }}</p>
    <ul v-else-if="results.length" class="search-results">
      <li v-for="item in results" :key="item.id" class="search-result-item">
        {{ item.title ?? item.name ?? item }}
      </li>
    </ul>
    <p v-else-if="query.trim()" class="search-status">No results found.</p>
  </div>
</template>
