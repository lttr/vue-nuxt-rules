<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-card">
      <h3 class="user-name">{{ user.name }}</h3>
      <p class="user-email">{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.user-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  width: 240px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-name {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

.user-email {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
