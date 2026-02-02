<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
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
  flex-wrap: wrap;
  gap: 1rem;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  min-width: 200px;
}

.user-card h3 {
  margin: 0 0 0.5rem;
}

.user-card p {
  margin: 0;
  color: #666;
}
</style>
