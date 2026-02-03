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
      aria-label="Search"
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <ul v-else-if="results.length">
      <li v-for="item in results" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <p v-else-if="query.trim()">No results found.</p>
  </div>
</template>

<style scoped>
.search-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

input[type='search'] {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.error {
  color: red;
}
</style>
