<script setup lang="ts">
const { name, email, avatarUrl = 'https://via.placeholder.com/150' } = defineProps<{
  name: string
  email: string
  avatarUrl?: string
}>()

const greeting = `Hello, ${name}!`
</script>

<template>
  <div class="user-card">
    <img :src="avatarUrl" :alt="`${name}'s avatar`" class="avatar" />
    <div class="info">
      <h3>{{ name }}</h3>
      <p>{{ email }}</p>
      <p class="greeting">{{ greeting }}</p>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info h3 {
  margin: 0;
}

.info p {
  margin: 0;
  color: #666;
}

.greeting {
  font-style: italic;
}
</style>
