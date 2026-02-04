<script setup lang="ts">
import { ref, watch } from 'vue'

interface SearchResult {
  id: string | number
  title: string
  description?: string
}

const query = ref('')
const results = ref<SearchResult[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchResults(searchQuery: string) {
  if (!searchQuery.trim()) {
    results.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
    if (!response.ok) {
      throw new Error('Search request failed')
    }
    results.value = await response.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred'
    results.value = []
  } finally {
    loading.value = false
  }
}

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

watch(query, (newQuery) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  debounceTimeout = setTimeout(() => {
    fetchResults(newQuery)
  }, 300)
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

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <ul v-else-if="results.length" class="results">
      <li v-for="result in results" :key="result.id" class="result-item">
        <h3>{{ result.title }}</h3>
        <p v-if="result.description">{{ result.description }}</p>
      </li>
    </ul>

    <div v-else-if="query.trim()" class="no-results">No results found</div>
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
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.loading,
.error,
.no-results {
  margin-top: 1rem;
  text-align: center;
}

.error {
  color: #dc3545;
}

.results {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.result-item {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.result-item h3 {
  margin: 0 0 0.5rem;
}

.result-item p {
  margin: 0;
  color: #666;
}
</style>
