<script setup>
const { name, email, avatarUrl = 'https://via.placeholder.com/80' } = defineProps({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String, default: 'https://via.placeholder.com/80' }
})

const greeting = `Hello, ${name}!`
</script>

<template>
  <div class="user-card">
    <img :src="avatarUrl" :alt="`${name}'s avatar`" class="avatar" />
    <div class="info">
      <h2>{{ name }}</h2>
      <p class="greeting">{{ greeting }}</p>
      <p class="email">{{ email }}</p>
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
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.info h2 {
  margin: 0;
}

.greeting {
  color: #4b5563;
  margin: 0.25rem 0;
}

.email {
  color: #6b7280;
  margin: 0;
}
</style>
