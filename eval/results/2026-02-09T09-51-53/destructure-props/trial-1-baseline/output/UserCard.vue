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
    default: 'https://via.placeholder.com/80',
  },
})

const greeting = computed(() => `Hello, ${props.name}!`)
</script>

<template>
  <div class="user-card">
    <img :src="avatarUrl" :alt="`${name}'s avatar`" class="user-card__avatar" />
    <div class="user-card__info">
      <p class="user-card__greeting">{{ greeting }}</p>
      <h2 class="user-card__name">{{ name }}</h2>
      <p class="user-card__email">{{ email }}</p>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  max-width: 360px;
}

.user-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__greeting {
  margin: 0 0 4px;
  font-size: 0.875rem;
  color: #666;
}

.user-card__name {
  margin: 0 0 4px;
  font-size: 1.125rem;
}

.user-card__email {
  margin: 0;
  font-size: 0.875rem;
  color: #888;
}
</style>
