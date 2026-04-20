<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
})

const greeting = `Hello, ${props.name}!`
console.log(greeting)
</script>

<template>
  <div class="user-card">
    <img :src="avatar" :alt="`${name}'s avatar`" class="user-card__avatar" />
    <div class="user-card__body">
      <h2 class="user-card__name">{{ name }}</h2>
      <p class="user-card__greeting">{{ greeting }}</p>
      <a :href="`mailto:${email}`" class="user-card__email">{{ email }}</a>
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
  max-width: 360px;
}
.user-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}
.user-card__name {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
}
.user-card__greeting {
  margin: 0 0 0.25rem;
  color: #4b5563;
}
.user-card__email {
  color: #2563eb;
  text-decoration: none;
}
</style>
