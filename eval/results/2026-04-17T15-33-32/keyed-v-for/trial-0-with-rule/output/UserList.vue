<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ul class="user-list">
    <li v-for="user in users" :key="user.id" class="user-card">
      <h3 class="user-card__name">{{ user.name }}</h3>
      <p class="user-card__email">{{ user.email }}</p>
    </li>
  </ul>
</template>

<style scoped>
.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.user-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.user-card__name {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}

.user-card__email {
  margin: 0;
  color: #4b5563;
  font-size: 0.95rem;
}
</style>
