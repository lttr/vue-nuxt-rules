<template>
  <div class="user-card">
    <img :src="avatarUrl" :alt="`${name}'s avatar`" class="user-card__avatar" />
    <div class="user-card__info">
      <h2 class="user-card__name">{{ name }}</h2>
      <p class="user-card__greeting">{{ greeting }}</p>
      <p class="user-card__email">{{ email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const PLACEHOLDER_AVATAR = 'https://placehold.co/80x80?text=User'

const props = withDefaults(
  defineProps<{
    name: string
    email: string
    avatarUrl?: string
  }>(),
  {
    avatarUrl: PLACEHOLDER_AVATAR,
  }
)

const greeting = computed(() => `Welcome, ${props.name}!`)
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  max-width: 360px;
}

.user-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-card__name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.user-card__greeting {
  margin: 0;
  font-size: 0.875rem;
  color: #4a5568;
}

.user-card__email {
  margin: 0;
  font-size: 0.875rem;
  color: #718096;
}
</style>
