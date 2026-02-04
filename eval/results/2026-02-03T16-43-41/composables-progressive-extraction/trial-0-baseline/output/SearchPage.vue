<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let debounceTimeout = null

async function fetchResults(searchQuery) {
  if (!searchQuery.trim()) {
    results.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
    if (!response.ok) {
      throw new Error('Search failed')
    }
    results.value = await response.json()
  } catch (err) {
    error.value = err.message
    results.value = []
  } finally {
    loading.value = false
  }
}

watch(query, (newQuery) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    fetchResults(newQuery)
  }, 300)
})
</script>

<template>
  <div class="search-page">
    <input
      v-model="query"
      type="text"
      placeholder="Search..."
      class="search-input"
    />

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <ul v-else-if="results.length" class="results">
      <li v-for="item in results" :key="item.id" class="result-item">
        {{ item.title || item.name || item }}
      </li>
    </ul>

    <div v-else-if="query.trim()" class="no-results">No results found</div>
  </div>
</template>

<style scoped>
.search-page {
  padding: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.loading,
.error,
.no-results {
  margin-top: 1rem;
}

.error {
  color: red;
}

.results {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.result-item {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
</style>
