<script setup>
import { ref } from 'vue'
import AvatarImage from './AvatarImage.vue'

const userName = ref('John Doe')
const avatarUrl = ref('https://example.com/avatar.jpg')
const isOnline = ref(true)
</script>

<template>
  <div class="user-profile">
    <AvatarImage :userName :avatarUrl :isOnline />
    <div class="user-info">
      <h2>{{ userName }}</h2>
      <span v-if="isOnline" class="status">Online</span>
      <span v-else class="status offline">Offline</span>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

.user-info h2 {
  margin: 0 0 4px 0;
  font-size: 1.25rem;
}

.status {
  color: #22c55e;
  font-size: 0.875rem;
}

.status.offline {
  color: #6b7280;
}
</style>
