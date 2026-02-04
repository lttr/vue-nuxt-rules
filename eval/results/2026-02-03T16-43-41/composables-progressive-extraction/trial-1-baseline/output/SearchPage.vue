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
    const response = await fetch(`/api/search?q=${encodeURIComponent(query.value)}`)
    if (!response.ok) {
      throw new Error('Search failed')
    }
    results.value = await response.json()
  } catch (err) {
    error.value = err.message
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
        type="text"
        placeholder="Search..."
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <ul v-if="results.length">
      <li v-for="item in results" :key="item.id">
        {{ item.name }}
      </li>
    </ul>

    <p v-else-if="!loading && query">No results found</p>
  </div>
</template>

<style scoped>
.search-page {
  padding: 1rem;
}

form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}

.error {
  color: red;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
