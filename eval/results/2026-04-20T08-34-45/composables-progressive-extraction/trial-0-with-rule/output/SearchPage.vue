<template>
  <div class="search-page">
    <input
      v-model="query"
      type="search"
      placeholder="Search..."
      @input="onInput"
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else-if="results.length">
      <li v-for="result in results" :key="result.id">
        <strong>{{ result.title }}</strong>
        <span v-if="result.description">— {{ result.description }}</span>
      </li>
    </ul>
    <p v-else-if="query && !loading">No results found.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let debounceTimer = null

function onInput() {
  clearTimeout(debounceTimer)
  error.value = null

  if (!query.value.trim()) {
    results.value = []
    return
  }

  debounceTimer = setTimeout(fetchResults, 300)
}

async function fetchResults() {
  loading.value = true
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query.value.trim())}`)
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    results.value = await response.json()
  } catch (err) {
    error.value = err.message
    results.value = []
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.search-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

input[type='search'] {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
