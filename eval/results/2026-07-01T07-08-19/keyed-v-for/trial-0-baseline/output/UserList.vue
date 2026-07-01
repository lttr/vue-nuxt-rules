<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-card">
      <h3 class="user-card__name">{{ user.name }}</h3>
      <p class="user-card__email">{{ user.email }}</p>
    </div>
  </div>
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
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}

.user-card__name {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 600;
}

.user-card__email {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}
</style>
