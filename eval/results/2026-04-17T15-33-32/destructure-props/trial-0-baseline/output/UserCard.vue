<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  }
})

const greeting = computed(() => `Hello, ${props.name}! Welcome back.`)
</script>

<template>
  <div class="user-card">
    <img :src="avatar" :alt="`${name}'s avatar`" class="avatar" />
    <div class="info">
      <h2 class="name">{{ name }}</h2>
      <p class="email">{{ email }}</p>
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
  max-width: 400px;
  font-family: sans-serif;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  margin: 0;
  font-size: 1.25rem;
}

.email {
  margin: 0.25rem 0 0;
  color: #666;
  font-size: 0.9rem;
}

.greeting {
  margin-top: 0.5rem;
  font-style: italic;
  color: #444;
}
</style>
