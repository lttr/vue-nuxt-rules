<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let controller = null

watch(query, async (value) => {
  if (controller) controller.abort()

  const term = value.trim()
  if (!term) {
    results.value = []
    error.value = null
    loading.value = false
    return
  }

  controller = new AbortController()
  loading.value = true
  error.value = null

  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(term)}`,
      { signal: controller.signal }
    )
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    results.value = await response.json()
  } catch (err) {
    if (err.name === 'AbortError') return
    error.value = err.message
    results.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="search-page">
    <input
      v-model="query"
      type="search"
      placeholder="Search..."
      class="search-input"
    />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <ul v-else-if="results.length" class="results">
      <li v-for="result in results" :key="result.id">
        {{ result.title }}
      </li>
    </ul>
    <p v-else-if="query.trim()">No results.</p>
  </div>
</template>

<style scoped>
.search-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}
.search-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}
.results {
  list-style: none;
  padding: 0;
}
.error {
  color: #c00;
}
</style>
