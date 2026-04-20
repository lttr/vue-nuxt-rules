<script setup lang="ts">
import { ref, watch } from 'vue'

interface SearchResult {
  id: string | number
  title: string
  description?: string
}

const query = ref('')
const results = ref<SearchResult[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

let controller: AbortController | null = null
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(query, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  const trimmed = value.trim()
  if (!trimmed) {
    results.value = []
    error.value = null
    loading.value = false
    if (controller) controller.abort()
    return
  }

  debounceTimer = setTimeout(async () => {
    if (controller) controller.abort()
    controller = new AbortController()

    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}`,
        { signal: controller.signal },
      )
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      results.value = await response.json()
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      error.value = (err as Error).message
      results.value = []
    } finally {
      loading.value = false
    }
  }, 300)
})
</script>

<template>
  <section class="search-page">
    <input
      v-model="query"
      type="search"
      placeholder="Search…"
      class="search-input"
      aria-label="Search"
    />

    <p v-if="loading" class="status">Loading…</p>
    <p v-else-if="error" class="status error">{{ error }}</p>
    <p v-else-if="query && !results.length" class="status">No results.</p>

    <ul v-else-if="results.length" class="results">
      <li v-for="item in results" :key="item.id" class="result">
        <h3>{{ item.title }}</h3>
        <p v-if="item.description">{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.search-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 1rem;
}
.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
}
.status {
  margin-top: 1rem;
  color: #666;
}
.status.error {
  color: #c00;
}
.results {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
}
.result {
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}
</style>
