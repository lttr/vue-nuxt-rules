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
    <h2>{{ userName }}</h2>
  </div>
</template>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
