<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

async function search() {
  if (!query.value.trim()) {
    results.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query.value)}`)
    if (!response.ok) throw new Error(`Search failed: ${response.status}`)
    results.value = await response.json()
  } catch (err) {
    error.value = err.message
    results.value = []
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="search-page">
    <form @submit.prevent="search">
      <input
        v-model="query"
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />
      <button type="submit">Search</button>
    </form>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <ul v-else-if="results.length">
      <li v-for="result in results" :key="result.id">
        {{ result.title }}
      </li>
    </ul>

    <p v-else-if="query">No results found.</p>
  </div>
</template>
