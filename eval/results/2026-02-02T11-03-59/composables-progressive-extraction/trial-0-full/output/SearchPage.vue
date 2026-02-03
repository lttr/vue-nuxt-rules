<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const query = ref('')
const results = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

let controller: AbortController | null = null

watchEffect((onCleanup) => {
  const searchTerm = query.value.trim()

  if (!searchTerm) {
    results.value = []
    error.value = null
    return
  }

  controller = new AbortController()
  loading.value = true
  error.value = null

  fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`, {
    signal: controller.signal,
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      return res.json()
    })
    .then((data) => {
      results.value = data
    })
    .catch((err) => {
      if (err.name !== 'AbortError') {
        error.value = err.message
      }
    })
    .finally(() => {
      loading.value = false
    })

  onCleanup(() => controller?.abort())
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
    <p v-else-if="error">{{ error }}</p>

    <ul v-if="results.length">
      <li v-for="item in results" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
