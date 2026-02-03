<script setup lang="ts">
import { ref, watch } from 'vue'

const query = ref('')
const results = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

let abortController: AbortController | null = null

watch(query, async (newQuery) => {
  if (abortController) {
    abortController.abort()
  }

  const trimmed = newQuery.trim()
  if (!trimmed) {
    results.value = []
    error.value = null
    return
  }

  abortController = new AbortController()
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
      signal: abortController.signal,
    })

    if (!response.ok) {
      throw new Error(`Search failed (${response.status})`)
    }

    results.value = await response.json()
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      error.value = err.message
      results.value = []
    }
  } finally {
    loading.value = false
  }
}, { flush: 'post' })
</script>

<template>
  <div class="search-page">
    <input
      v-model="query"
      type="search"
      placeholder="Search..."
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <ul v-if="results.length">
      <li v-for="item in results" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
