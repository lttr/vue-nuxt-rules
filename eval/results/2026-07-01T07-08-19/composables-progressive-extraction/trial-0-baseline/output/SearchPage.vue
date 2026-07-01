<template>
  <div class="search-page">
    <input
      v-model="query"
      type="text"
      placeholder="Search..."
      @input="onQueryChange"
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="query && results.length === 0">No results found.</p>

    <ul v-else>
      <li v-for="result in results" :key="result.id">
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')

let debounceTimer = null

function onQueryChange() {
  clearTimeout(debounceTimer)

  if (!query.value.trim()) {
    results.value = []
    error.value = ''
    return
  }

  debounceTimer = setTimeout(() => {
    search(query.value)
  }, 300)
}

async function search(term) {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`)

    if (!response.ok) {
      throw new Error(`Search failed with status ${response.status}`)
    }

    const data = await response.json()
    results.value = data.results ?? []
  } catch (err) {
    error.value = 'Something went wrong while searching.'
    results.value = []
  } finally {
    loading.value = false
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
  padding: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
}

.search-page ul {
  list-style: none;
  padding: 0;
}

.search-page li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
