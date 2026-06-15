<script setup>
import { ref, watch, onUnmounted } from 'vue'

// Search logic lives inline here because it's only used by this component.
// If it ever needs reuse, extract it into a `useSearch` composable.

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let debounceTimer = null
let activeController = null

const DEBOUNCE_MS = 300
const API_URL = '/api/search'

async function runSearch(term) {
  // Abort any in-flight request so out-of-order responses can't
  // overwrite the results for the latest query.
  if (activeController) activeController.abort()
  activeController = new AbortController()

  loading.value = true
  error.value = null

  try {
    const res = await fetch(
      `${API_URL}?q=${encodeURIComponent(term)}`,
      { signal: activeController.signal },
    )
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    const data = await res.json()
    results.value = Array.isArray(data) ? data : data.results ?? []
  } catch (err) {
    if (err.name === 'AbortError') return // superseded by a newer search
    error.value = err.message || 'Something went wrong'
    results.value = []
  } finally {
    // Only the latest request should clear the loading state.
    if (!activeController.signal.aborted) loading.value = false
  }
}

watch(query, (value) => {
  clearTimeout(debounceTimer)
  const term = value.trim()

  if (!term) {
    if (activeController) activeController.abort()
    results.value = []
    error.value = null
    loading.value = false
    return
  }

  debounceTimer = setTimeout(() => runSearch(term), DEBOUNCE_MS)
})

onUnmounted(() => {
  clearTimeout(debounceTimer)
  if (activeController) activeController.abort()
})
</script>

<template>
  <section class="search-page">
    <label class="search-field">
      <span class="visually-hidden">Search</span>
      <input
        v-model="query"
        type="search"
        class="search-input"
        placeholder="Search…"
        autocomplete="off"
        aria-label="Search"
      />
    </label>

    <p v-if="loading" class="search-status" role="status">Searching…</p>
    <p v-else-if="error" class="search-status search-status--error" role="alert">
      {{ error }}
    </p>
    <p
      v-else-if="query.trim() && results.length === 0"
      class="search-status"
      role="status"
    >
      No results found.
    </p>

    <ul v-else-if="results.length" class="search-results">
      <li v-for="(item, index) in results" :key="item.id ?? index" class="search-result">
        {{ item.title ?? item.name ?? item }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.search-page {
  max-width: 32rem;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #4a90d9;
  box-shadow: 0 0 0 2px rgba(74, 144, 217, 0.3);
}

.search-status {
  margin: 0.75rem 0;
  color: #555;
}

.search-status--error {
  color: #c0392b;
}

.search-results {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}

.search-result {
  padding: 0.6rem 0.4rem;
  border-bottom: 1px solid #eee;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
