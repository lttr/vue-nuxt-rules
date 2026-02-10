<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let debounceTimer = null

watch(query, (value) => {
  clearTimeout(debounceTimer)
  error.value = null

  if (!value.trim()) {
    results.value = []
    return
  }

  debounceTimer = setTimeout(() => fetchResults(value.trim()), 300)
})

async function fetchResults(searchTerm) {
  loading.value = true
  error.value = null

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    const data = await res.json()
    results.value = data.results ?? data
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
    <input
      v-model="query"
      type="search"
      placeholder="Search..."
      aria-label="Search"
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <ul v-else-if="results.length">
      <li v-for="item in results" :key="item.id ?? item">
        {{ item.title ?? item.name ?? item }}
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

.error {
  color: red;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
