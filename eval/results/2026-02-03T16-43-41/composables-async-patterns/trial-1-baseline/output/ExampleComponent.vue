<script setup lang="ts">
import { useFetch } from './useFetch'

interface User {
  id: number
  name: string
  email: string
}

const { data, error, isLoading, execute } = useFetch<User[]>(
  'https://jsonplaceholder.typicode.com/users'
)
</script>

<template>
  <div class="container">
    <!-- Loading spinner -->
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Error message -->
    <div v-else-if="error" class="error">
      <p>Error: {{ error.message }}</p>
      <button @click="execute">Retry</button>
    </div>

    <!-- Data display -->
    <div v-else-if="data">
      <h2>Users</h2>
      <ul>
        <li v-for="user in data" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: #e74c3c;
  padding: 1rem;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  background-color: #fdf2f2;
}

.error button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
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
