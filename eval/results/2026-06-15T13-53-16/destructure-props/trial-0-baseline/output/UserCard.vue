<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: 'https://via.placeholder.com/96?text=User',
  },
})

const greeting = computed(() => `Hello, ${props.name}! Welcome back.`)
</script>

<template>
  <div class="user-card">
    <img class="user-card__avatar" :src="avatarUrl" :alt="`${name}'s avatar`" />
    <div class="user-card__body">
      <h2 class="user-card__name">{{ name }}</h2>
      <a class="user-card__email" :href="`mailto:${email}`">{{ email }}</a>
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
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  max-width: 360px;
  font-family: system-ui, sans-serif;
}

.user-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-card__name {
  margin: 0;
  font-size: 1.125rem;
}

.user-card__email {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.875rem;
}

.user-card__greeting {
  margin: 0;
  color: #475569;
  font-size: 0.875rem;
}
</style>
