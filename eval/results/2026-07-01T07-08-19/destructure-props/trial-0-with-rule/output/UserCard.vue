<template>
  <div class="user-card">
    <img :src="avatar" :alt="name" class="user-card__avatar" />
    <div class="user-card__info">
      <h3 class="user-card__name">{{ name }}</h3>
      <p class="user-card__email">{{ email }}</p>
    </div>
  </div>
</template>

<script setup>
const {
  name,
  email,
  avatar = 'https://via.placeholder.com/150',
} = defineProps({
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

const greeting = `Hello, ${name}!`
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.user-card__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.user-card__email {
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
}
</style>
