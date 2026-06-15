<script setup>
const { name, email, avatar = 'https://via.placeholder.com/96' } = defineProps({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: 'https://via.placeholder.com/96' },
})

const greeting = `Hello, ${name}!`
</script>

<template>
  <div class="user-card">
    <img class="user-card__avatar" :src="avatar" :alt="`${name}'s avatar`" />
    <div class="user-card__body">
      <p class="user-card__greeting">{{ greeting }}</p>
      <h2 class="user-card__name">{{ name }}</h2>
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
  max-width: 320px;
}

.user-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__greeting {
  margin: 0 0 0.25rem;
  color: #666;
  font-size: 0.875rem;
}

.user-card__name {
  margin: 0;
  font-size: 1.125rem;
}

.user-card__email {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
}
</style>
