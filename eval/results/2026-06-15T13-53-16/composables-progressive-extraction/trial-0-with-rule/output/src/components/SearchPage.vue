<script setup>
import { ref } from 'vue'

// Search logic is inline: it's only used here. Per project convention,
// extract to a shared composable only once a second consumer appears.
const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

async function search() {
  const q = query.value.trim()
  if (!q) {
    results.value = []
    return
  }

  loading.value = true
  error.value = null
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`)
    }
    const data = await res.json()
    results.value = data.results ?? []
  } catch (err) {
    error.value = err.message ?? 'Something went wrong'
    results.value = []
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="search-page">
    <form class="search-form" @submit.prevent="search">
      <input
        v-model="query"
        type="search"
        placeholder="Search…"
        aria-label="Search"
      />
      <button type="submit" :disabled="loading">Search</button>
    </form>

    <p v-if="loading">Loading…</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <ul v-else-if="results.length" class="results">
      <li v-for="result in results" :key="result.id">
        {{ result.title }}
      </li>
    </ul>
    <p v-else>No results.</p>
  </div>
</template>
