<template>
  <div class="user-profile">
    <AvatarImage :userName="userName" :avatarUrl="avatarUrl" :isOnline="isOnline" />
    <div class="user-profile__name">{{ userName }}</div>
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

.user-profile__name {
  font-weight: 600;
}
</style>
