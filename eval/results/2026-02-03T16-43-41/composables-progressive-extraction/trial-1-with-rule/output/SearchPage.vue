<script setup lang="ts">
import { ref, watch } from 'vue'

interface SearchResult {
  id: string | number
  title: string
  description?: string
}

const searchQuery = ref('')
const results = ref<SearchResult[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function fetchResults(query: string) {
  if (!query.trim()) {
    results.value = []
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error('Search request failed')
    }
    results.value = await response.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred'
    results.value = []
  } finally {
    isLoading.value = false
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (newQuery) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    fetchResults(newQuery)
  }, 300)
})
</script>

<template>
  <div class="search-page">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      class="search-input"
    />

    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <ul v-else-if="results.length" class="results">
      <li v-for="result in results" :key="result.id" class="result-item">
        <h3>{{ result.title }}</h3>
        <p v-if="result.description">{{ result.description }}</p>
      </li>
    </ul>

    <div v-else-if="searchQuery.trim()" class="no-results">
      No results found
    </div>
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
  padding: 1rem;
  text-align: center;
}

.error {
  color: #d32f2f;
}

.results {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.result-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.result-item h3 {
  margin: 0 0 0.5rem;
}

.result-item p {
  margin: 0;
  color: #666;
}
</style>
