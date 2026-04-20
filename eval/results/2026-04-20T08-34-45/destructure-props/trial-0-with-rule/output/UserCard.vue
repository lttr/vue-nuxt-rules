<template>
  <div class="user-card">
    <img :src="avatarUrl" :alt="`${name}'s avatar`" class="user-card__avatar" />
    <div class="user-card__info">
      <h2 class="user-card__name">{{ name }}</h2>
      <p class="user-card__email">{{ email }}</p>
      <p class="user-card__greeting">{{ greeting }}</p>
    </div>
  </div>
</template>

<script setup>
const { name, email, avatarUrl = 'https://placehold.co/80x80' } = defineProps({
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
    default: 'https://placehold.co/80x80',
  },
})

const greeting = `Welcome, ${name}!`
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.user-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__name {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
}

.user-card__email {
  margin: 0 0 0.25rem;
  color: #64748b;
  font-size: 0.875rem;
}

.user-card__greeting {
  margin: 0;
  font-style: italic;
}
</style>
