<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
    default: () => [],
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
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.user-card {
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.user-card__name {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.user-card__email {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}
</style>
