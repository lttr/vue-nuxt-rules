<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number | string
  name: string
  email: string
}

defineProps<{
  users: User[]
}>()
</script>

<style scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.user-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.user-card h3 {
  margin: 0 0 0.5rem;
}

.user-card p {
  margin: 0;
  color: #666;
}
</style>
