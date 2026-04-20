<template>
  <ul class="user-list">
    <li v-for="user in users" :key="user.id" class="user-card">
      <p class="user-name">{{ user.name }}</p>
      <p class="user-email">{{ user.email }}</p>
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
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
}

.user-name {
  margin: 0 0 4px;
  font-weight: 600;
}

.user-email {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
}
</style>
