<script setup lang="ts">
const { name, email, avatar = 'https://via.placeholder.com/150' } = defineProps<{
  name: string
  email: string
  avatar?: string
}>()

const greeting = `Hello, ${name}!`
</script>

<template>
  <div class="user-card">
    <img :src="avatar" :alt="name" class="user-card__avatar" />
    <div class="user-card__info">
      <h2>{{ name }}</h2>
      <p>{{ email }}</p>
      <p>{{ greeting }}</p>
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

.user-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__info h2 {
  margin: 0 0 0.25rem;
}

.user-card__info p {
  margin: 0;
  color: #666;
}
</style>
