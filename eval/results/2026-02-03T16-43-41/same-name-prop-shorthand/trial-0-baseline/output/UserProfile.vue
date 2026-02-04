<script setup>
import AvatarImage from './AvatarImage.vue'

const userName = 'John Doe'
const avatarUrl = 'https://example.com/avatar.jpg'
const isOnline = true
</script>

<template>
  <div class="user-profile">
    <AvatarImage
      :userName="userName"
      :avatarUrl="avatarUrl"
      :isOnline="isOnline"
    />
  </div>
</template>
