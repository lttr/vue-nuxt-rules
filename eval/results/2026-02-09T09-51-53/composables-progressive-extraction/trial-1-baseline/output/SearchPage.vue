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
      results.value = []
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
    <p v-else-if="query && !results.length" class="search-status">No results found.</p>

    <ul v-if="results.length" class="search-results">
      <li v-for="item in results" :key="item.id" class="search-result-item">
        <h3>{{ item.title }}</h3>
        <p v-if="item.description">{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.search-status,
.search-error {
  margin-top: 1rem;
  color: #666;
}

.search-error {
  color: #d32f2f;
}

.search-results {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.search-result-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.search-result-item h3 {
  margin: 0 0 0.25rem;
}

.search-result-item p {
  margin: 0;
  color: #555;
}
</style>
