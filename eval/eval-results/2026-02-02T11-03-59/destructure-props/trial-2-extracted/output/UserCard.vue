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
    <img :src="avatarUrl" :alt="name" class="user-card__avatar" />
    <div class="user-card__info">
      <h2 class="user-card__name">{{ name }}</h2>
      <p class="user-card__email">{{ email }}</p>
      <p class="user-card__greeting">{{ greeting }}</p>
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

.user-card__name {
  margin: 0;
  font-size: 1.25rem;
}

.user-card__email {
  margin: 0.25rem 0 0;
  color: #666;
}

.user-card__greeting {
  margin: 0.25rem 0 0;
  font-style: italic;
}
</style>
