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

<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-card">
      <h3 class="user-name">{{ user.name }}</h3>
      <p class="user-email">{{ user.email }}</p>
    </div>
  </div>
</template>

<style scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.user-card {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  min-width: 200px;
}

.user-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.user-email {
  margin: 0;
  color: #666;
}
</style>
