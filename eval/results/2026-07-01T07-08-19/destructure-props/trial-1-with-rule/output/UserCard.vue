<script setup>
const { name, email, avatarUrl = 'https://placehold.co/100x100' } = defineProps({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String, required: false },
})

const greeting = `Hello, ${name}!`
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
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.user-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__name {
  margin: 0;
  font-size: 1.1rem;
}

.user-card__email {
  margin: 0;
  color: #666;
}
</style>
