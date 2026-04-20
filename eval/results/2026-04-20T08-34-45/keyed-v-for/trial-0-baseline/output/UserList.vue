<template>
  <ul class="user-list">
    <li v-for="user in users" :key="user.id" class="user-card">
      <span class="user-name">{{ user.name }}</span>
      <span class="user-email">{{ user.email }}</span>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.user-name {
  font-weight: 600;
  font-size: 1rem;
  color: #1a202c;
}

.user-email {
  font-size: 0.875rem;
  color: #718096;
}
</style>
