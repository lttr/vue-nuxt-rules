<script setup>
import { ref, watch } from 'vue'

// Search logic kept inline — it's only used here. Per the project rule,
// extract to a shared composable only once a second consumer exists.
function useSearch() {
  const query = ref('')
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)

  let requestId = 0

  async function search() {
    const term = query.value.trim()
    if (!term) {
      results.value = []
      error.value = null
      loading.value = false
      return
    }

    const currentRequest = ++requestId
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`)
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
      }
      const data = await response.json()
      // Ignore out-of-order responses from stale requests.
      if (currentRequest === requestId) {
        results.value = data.results ?? []
      }
    } catch (err) {
      if (currentRequest === requestId) {
        error.value = err.message
        results.value = []
      }
    } finally {
      if (currentRequest === requestId) {
        loading.value = false
      }
    }
  }

  // Debounce input so we don't fire a request on every keystroke.
  let debounceTimer
  watch(query, () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(search, 300)
  })

  return { query, results, loading, error, search }
}

const { query, results, loading, error, search } = useSearch()
</script>

<template>
  <div class="search-page">
    <form class="search-form" @submit.prevent="search">
      <input
        v-model="query"
        type="search"
        class="search-input"
        placeholder="Search…"
        aria-label="Search"
      />
      <button type="submit">Search</button>
    </form>

    <p v-if="loading" class="search-status">Loading…</p>
    <p v-else-if="error" class="search-status search-error">{{ error }}</p>
    <p v-else-if="query && !results.length" class="search-status">No results found.</p>

    <ul v-else class="search-results">
      <li v-for="result in results" :key="result.id" class="search-result">
        {{ result.title ?? result.name ?? result }}
      </li>
    </ul>
  </div>
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
  padding: 0.5rem;
}

.search-status {
  margin-top: 1rem;
  color: #666;
}

.search-error {
  color: #c00;
}

.search-results {
  margin-top: 1rem;
  padding: 0;
  list-style: none;
}

.search-result {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
