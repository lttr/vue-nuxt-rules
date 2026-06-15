<script setup>
import { ref } from 'vue'
import AvatarImage from './AvatarImage.vue'

const userName = ref('Jane Doe')
const avatarUrl = ref('https://example.com/avatar.jpg')
const isOnline = ref(true)
</script>

<template>
  <div class="user-profile">
    <AvatarImage
      :userName="userName"
      :avatarUrl="avatarUrl"
      :isOnline="isOnline"
    />
    <div class="user-profile__info">
      <h2 class="user-profile__name">{{ userName }}</h2>
      <p class="user-profile__status">
        {{ isOnline ? 'Online' : 'Offline' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-profile__name {
  margin: 0;
  font-size: 1.1rem;
}

.user-profile__status {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}
</style>
