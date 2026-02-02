<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from './useFetch'

const userId = ref(1)

const { data: user, error, isLoading } = useFetch<{ name: string; email: string }>(
  () => `/api/users/${userId.value}`
)
</script>

<template>
  <div class="user-profile">
    <div v-if="isLoading" class="spinner">Loading...</div>

    <div v-else-if="error" class="error">
      Error: {{ error.message }}
    </div>

    <div v-else-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>

    <button @click="userId++">Next user</button>
  </div>
</template>

<style scoped>
.spinner {
  color: #888;
}
.error {
  color: red;
}
</style>
