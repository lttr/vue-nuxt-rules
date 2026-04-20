<template>
  <div class="user-profile">
    <AvatarImage
      :userName="userName"
      :avatarUrl="avatarUrl"
      :isOnline="isOnline"
    />
  </div>
</template>

<script setup>
import AvatarImage from './AvatarImage.vue'

const userName = 'Jane Doe'
const avatarUrl = 'https://example.com/avatar.png'
const isOnline = true
</script>
