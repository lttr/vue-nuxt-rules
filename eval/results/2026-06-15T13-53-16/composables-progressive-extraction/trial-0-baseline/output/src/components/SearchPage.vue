<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')

let activeController = null

async function search() {
  const term = query.value.trim()
  if (!term) {
    results.value = []
    error.value = ''
    return
  }

  // Cancel any in-flight request so stale responses can't overwrite newer ones.
  if (activeController) activeController.abort()
  activeController = new AbortController()

  loading.value = true
  error.value = ''

  try {
    const res = await fetch(
      `/api/search?q=${encodeURIComponent(term)}`,
      { signal: activeController.signal },
    )
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    const data = await res.json()
    results.value = data.results ?? []
  } catch (err) {
    if (err.name === 'AbortError') return
    error.value = err.message || 'Something went wrong'
    results.value = []
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="search-page">
    <form class="search-form" @submit.prevent="search">
      <input
        v-model="query"
        type="search"
        class="search-input"
        placeholder="Search…"
        aria-label="Search"
      />
      <button type="submit" :disabled="loading">Search</button>
    </form>

    <p v-if="loading" class="search-status">Loading…</p>
    <p v-else-if="error" class="search-status search-error">{{ error }}</p>
    <p v-else-if="query && !results.length" class="search-status">No results found.</p>

    <ul v-else class="search-results">
      <li v-for="result in results" :key="result.id" class="search-result">
        {{ result.title }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.search-page {
  max-width: 640px;
  margin: 0 auto;
}

.search-form {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
}

.search-status {
  margin-top: 1rem;
  color: #666;
}

.search-error {
  color: #c0392b;
}

.search-results {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
}

.search-result {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #eee;
}
</style>
