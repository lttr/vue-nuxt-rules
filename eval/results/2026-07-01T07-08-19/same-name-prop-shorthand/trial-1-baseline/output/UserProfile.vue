<template>
  <div class="user-profile">
    <AvatarImage
      :userName="userName"
      :avatarUrl="avatarUrl"
      :isOnline="isOnline"
    />
    <div class="user-profile__info">
      <span class="user-profile__name">{{ userName }}</span>
      <span class="user-profile__status">{{ isOnline ? 'Online' : 'Offline' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AvatarImage from './AvatarImage.vue'

const userName = ref('Jane Doe')
const avatarUrl = ref('https://example.com/avatar.jpg')
const isOnline = ref(true)
</script>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-profile__info {
  display: flex;
  flex-direction: column;
}

.user-profile__name {
  font-weight: 600;
}

.user-profile__status {
  font-size: 0.85rem;
  color: #6b7280;
}
</style>
