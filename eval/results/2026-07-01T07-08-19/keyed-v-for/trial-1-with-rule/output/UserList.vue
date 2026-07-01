<template>
  <div class="user-list">
    <div class="user-card" v-for="user in users" :key="user.id">
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
  gap: 12px;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px 16px;
  min-width: 200px;
}

.user-card h3 {
  margin: 0 0 4px;
}

.user-card p {
  margin: 0;
  color: #666;
}
</style>
