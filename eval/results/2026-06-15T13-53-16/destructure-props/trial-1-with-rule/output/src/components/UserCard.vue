<script setup>
import { computed } from 'vue'

const { name, email, avatar = 'https://via.placeholder.com/96' } = defineProps({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: 'https://via.placeholder.com/96' },
})

const greeting = computed(() => `Hello, ${name}! Welcome back.`)
</script>

<template>
  <div class="user-card">
    <img class="user-card__avatar" :src="avatar" :alt="`${name}'s avatar`" />
    <div class="user-card__body">
      <h2 class="user-card__name">{{ name }}</h2>
      <p class="user-card__greeting">{{ greeting }}</p>
      <a class="user-card__email" :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  max-width: 360px;
}

.user-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__name {
  margin: 0;
  font-size: 1.125rem;
}

.user-card__greeting {
  margin: 0.25rem 0;
  color: #555;
}

.user-card__email {
  color: #2563eb;
  text-decoration: none;
}
</style>
