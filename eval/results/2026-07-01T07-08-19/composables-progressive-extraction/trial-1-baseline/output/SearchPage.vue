<template>
  <div class="search-page">
    <input
      v-model="query"
      type="text"
      placeholder="Search..."
      @input="onInput"
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="query && results.length === 0">No results found.</p>

    <ul v-else>
      <li v-for="item in results" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const SEARCH_API_URL = 'https://example.com/api/search'
const DEBOUNCE_MS = 300

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')

let debounceTimer = null
let requestId = 0

function onInput() {
  clearTimeout(debounceTimer)

  if (!query.value) {
    results.value = []
    error.value = ''
    loading.value = false
    return
  }

  debounceTimer = setTimeout(() => search(query.value), DEBOUNCE_MS)
}

async function search(term) {
  const currentRequest = ++requestId
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(`${SEARCH_API_URL}?q=${encodeURIComponent(term)}`)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (currentRequest === requestId) {
      results.value = data.results ?? []
    }
  } catch (err) {
    if (currentRequest === requestId) {
      error.value = 'Failed to fetch results. Please try again.'
      results.value = []
    }
  } finally {
    if (currentRequest === requestId) {
      loading.value = false
    }
  }
}
</script>

<style scoped>
.search-page {
  max-width: 480px;
  margin: 0 auto;
}

.search-page input {
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
}

.search-page ul {
  list-style: none;
  padding: 0;
}

.search-page li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
</style>
