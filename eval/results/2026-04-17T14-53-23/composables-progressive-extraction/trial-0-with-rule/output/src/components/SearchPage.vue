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
  if (controller) controller.abort()

  const trimmed = value.trim()
  if (!trimmed) {
    results.value = []
    loading.value = false
    error.value = null
    return
  }

  debounceTimer = setTimeout(async () => {
    controller = new AbortController()
    loading.value = true
    error.value = null
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}`,
        { signal: controller.signal },
      )
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      results.value = await res.json()
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      error.value = (err as Error).message
      results.value = []
    } finally {
      loading.value = false
    }
  }, 250)
})
</script>

<template>
  <section class="search-page">
    <input
      v-model="query"
      type="search"
      placeholder="Search..."
      aria-label="Search"
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <ul v-else-if="results.length">
      <li v-for="item in results" :key="item.id">
        <strong>{{ item.title }}</strong>
        <p v-if="item.description">{{ item.description }}</p>
      </li>
    </ul>
    <p v-else-if="query.trim()">No results.</p>
  </section>
</template>
