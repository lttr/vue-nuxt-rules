<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const query = ref('')
const results = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

let abortController: AbortController | null = null

watchEffect(() => {
  const searchTerm = query.value.trim()

  if (abortController) {
    abortController.abort()
  }

  if (!searchTerm) {
    results.value = []
    error.value = null
    return
  }

  loading.value = true
  error.value = null
  abortController = new AbortController()

  fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`, {
    signal: abortController.signal,
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Search failed (${res.status})`)
      return res.json()
    })
    .then((data) => {
      results.value = data
      loading.value = false
    })
    .catch((err) => {
      if (err.name === 'AbortError') return
      error.value = err.message
      loading.value = false
    })
})
</script>

<template>
  <div class="search-page">
    <input
      v-model="query"
      type="search"
      placeholder="Search..."
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <ul v-if="results.length">
      <li v-for="item in results" :key="item.id">
        {{ item.name ?? item.title ?? item }}
      </li>
    </ul>
    <p v-else-if="query.trim() && !loading && !error">No results found.</p>
  </div>
</template>
