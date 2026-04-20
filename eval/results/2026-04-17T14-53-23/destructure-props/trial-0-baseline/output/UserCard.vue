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
    default: 'https://via.placeholder.com/150',
  },
})

const greeting = computed(() => `Hello, ${props.name}!`)
</script>

<template>
  <div class="user-card">
    <img :src="avatarUrl" :alt="`${name}'s avatar`" class="avatar" />
    <div class="info">
      <h2 class="name">{{ name }}</h2>
      <p class="greeting">{{ greeting }}</p>
      <a :href="`mailto:${email}`" class="email">{{ email }}</a>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  max-width: 400px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
}

.greeting {
  margin: 0 0 0.25rem;
  color: #4b5563;
}

.email {
  color: #2563eb;
  text-decoration: none;
}

.email:hover {
  text-decoration: underline;
}
</style>
