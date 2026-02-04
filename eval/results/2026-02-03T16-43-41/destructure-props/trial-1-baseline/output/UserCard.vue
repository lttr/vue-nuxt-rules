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
  avatarUrl: {
    type: String,
    default: 'https://via.placeholder.com/80'
  }
})

const greeting = computed(() => `Hello, ${props.name}!`)
</script>

<template>
  <div class="user-card">
    <img :src="avatarUrl" :alt="`${name}'s avatar`" class="avatar" />
    <div class="info">
      <h3 class="name">{{ name }}</h3>
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
  background: #fff;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.name {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.email {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.greeting {
  margin: 0;
  color: #4a90d9;
  font-style: italic;
}
</style>
