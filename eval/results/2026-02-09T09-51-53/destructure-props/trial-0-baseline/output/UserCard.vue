<template>
  <div class="user-card">
    <img :src="avatar" :alt="`${name}'s avatar`" class="user-card__avatar" />
    <div class="user-card__info">
      <h2 class="user-card__name">{{ name }}</h2>
      <p class="user-card__email">{{ email }}</p>
      <p class="user-card__greeting">{{ greeting }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    email: string
    avatar?: string
  }>(),
  {
    avatar: 'https://via.placeholder.com/80',
  }
)

const greeting = computed(() => `Hello, ${props.name}! Welcome back.`)
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  max-width: 400px;
}

.user-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-card__name {
  margin: 0;
  font-size: 1.25rem;
}

.user-card__email {
  margin: 0;
  color: #666;
}

.user-card__greeting {
  margin: 0;
  font-style: italic;
  color: #444;
}
</style>
