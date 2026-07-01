<template>
  <div class="user-list">
    <div class="user-card" v-for="user in users" :key="user.id">
      <p class="user-name">{{ user.name }}</p>
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
  padding: 12px 16px;
}

.user-name {
  font-weight: 600;
  margin: 0 0 4px;
}

.user-email {
  color: #666;
  margin: 0;
}
</style>
