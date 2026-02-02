<script setup>
import { ref } from 'vue'
import AvatarImage from './AvatarImage.vue'

const userName = ref('')
const avatarUrl = ref('')
const isOnline = ref(false)
</script>

<template>
  <div class="user-profile">
    <AvatarImage :userName :avatarUrl :isOnline />
  </div>
</template>
