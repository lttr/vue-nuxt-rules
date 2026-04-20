<script setup>
const { name, email, avatar = 'https://via.placeholder.com/150' } = defineProps({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: 'https://via.placeholder.com/150' },
})

const greeting = `Hello, ${name}!`
</script>

<template>
  <div class="user-card">
    <img :src="avatar" :alt="`${name}'s avatar`" class="avatar" />
    <h2>{{ name }}</h2>
    <p>{{ greeting }}</p>
    <p>{{ email }}</p>
  </div>
</template>
