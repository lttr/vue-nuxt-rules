<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

async function search() {
  if (!query.value.trim()) {
    results.value = []
    return
  }
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query.value)}`)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    results.value = await res.json()
  } catch (e) {
    error.value = e.message
    results.value = []
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="search-page">
    <form @submit.prevent="search">
      <input
        v-model="query"
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />
      <button type="submit" :disabled="loading">Search</button>
    </form>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <ul v-else-if="results.length">
      <li v-for="item in results" :key="item.id">{{ item.title }}</li>
    </ul>
    <p v-else-if="query">No results.</p>
  </div>
</template>
