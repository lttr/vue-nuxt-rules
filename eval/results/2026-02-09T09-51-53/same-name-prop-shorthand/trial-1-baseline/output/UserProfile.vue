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

<script setup>
import { ref } from 'vue'
import AvatarImage from './AvatarImage.vue'

const userName = ref('John Doe')
const avatarUrl = ref('https://example.com/avatar.png')
const isOnline = ref(true)
</script>
