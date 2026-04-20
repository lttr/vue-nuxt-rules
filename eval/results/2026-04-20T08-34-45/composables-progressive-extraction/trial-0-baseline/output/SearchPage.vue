<template>
  <div class="search-page">
    <div class="search-bar">
      <input
        v-model="query"
        type="search"
        placeholder="Search..."
        @input="onInput"
      />
    </div>

    <div v-if="loading" class="status">Loading...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <div v-else-if="results.length === 0 && query" class="status">No results found.</div>

    <ul v-else class="results">
      <li v-for="result in results" :key="result.id" class="result-item">
        <h3>{{ result.title }}</h3>
        <p>{{ result.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let debounceTimer = null

async function fetchResults(searchQuery) {
  if (!searchQuery.trim()) {
    results.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(searchQuery)}`
    )
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    results.value = await response.json()
  } catch (err) {
    error.value = err.message
    results.value = []
  } finally {
    loading.value = false
  }
}

function onInput() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => fetchResults(query.value), 300)
}
</script>

<style scoped>
.search-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: sans-serif;
}

.search-bar input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.status {
  margin-top: 1rem;
  color: #666;
}

.status.error {
  color: #c00;
}

.results {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
}

.result-item {
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.result-item h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.result-item p {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
}
</style>
