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
    <ul v-else-if="results.length" class="results">
      <li v-for="item in results" :key="item.id" class="result-item">
        <strong>{{ item.title }}</strong>
        <p v-if="item.description">{{ item.description }}</p>
      </li>
    </ul>
    <div v-else-if="query && !loading" class="status">No results found.</div>
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
    const params = new URLSearchParams({ q: searchQuery })
    const response = await fetch(`/api/search?${params}`)
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
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: sans-serif;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem 0.75rem;
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
  color: #c0392b;
}

.results {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.result-item {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

.result-item p {
  margin: 0.25rem 0 0;
  color: #555;
  font-size: 0.9rem;
}
</style>
