<template>
  <div class="user-profile">
    <AvatarImage :userName :avatarUrl :isOnline />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AvatarImage from './AvatarImage.vue'

const userName = ref('Jane Doe')
const avatarUrl = ref('https://example.com/avatar.png')
const isOnline = ref(true)
</script>
