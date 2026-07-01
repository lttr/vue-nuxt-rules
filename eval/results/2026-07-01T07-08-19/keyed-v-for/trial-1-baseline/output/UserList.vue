<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="user-list">
    <div class="user-card" v-for="user in users" :key="user.id">
      <p class="user-name">{{ user.name }}</p>
      <p class="user-email">{{ user.email }}</p>
    </div>
  </div>
</template>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.user-name {
  font-weight: 600;
  margin: 0;
}

.user-email {
  color: #666;
  margin: 0.25rem 0 0;
}
</style>
