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
      <h3 class="user-name">{{ user.name }}</h3>
      <p class="user-email">{{ user.email }}</p>
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
  padding: 1rem 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.user-name {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
}

.user-email {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
