<script setup lang="ts">
import { useFetch } from './useFetch'

interface User {
  id: number
  name: string
  email: string
}

const { data: users, error, isLoading } = useFetch<User[]>('/api/users')
</script>

<template>
  <div class="user-list">
    <div v-if="isLoading" class="spinner">Loading…</div>

    <div v-else-if="error" class="error">
      Failed to load users: {{ error.message }}
    </div>

    <ul v-else-if="users">
      <li v-for="user in users" :key="user.id">
        {{ user.name }} — {{ user.email }}
      </li>
    </ul>
  </div>
</template>
