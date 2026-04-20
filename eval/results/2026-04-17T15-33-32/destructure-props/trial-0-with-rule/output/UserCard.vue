<script setup>
const { name, email, avatarUrl = 'https://via.placeholder.com/100' } = defineProps({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String, default: 'https://via.placeholder.com/100' }
})

const greeting = `Hello, ${name}!`
</script>

<template>
  <div class="user-card">
    <img :src="avatarUrl" :alt="`${name}'s avatar`" class="avatar" />
    <div class="info">
      <h2>{{ name }}</h2>
      <p>{{ greeting }}</p>
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
  border: 1px solid #ddd;
  border-radius: 8px;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}
.email {
  color: #666;
}
</style>
