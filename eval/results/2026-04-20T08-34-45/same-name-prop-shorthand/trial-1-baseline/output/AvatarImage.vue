<template>
  <div class="avatar-image">
    <img :src="avatarUrl" :alt="userName" />
    <span :class="['status', isOnline ? 'online' : 'offline']"></span>
  </div>
</template>

<script setup>
defineProps({
  userName: String,
  avatarUrl: String,
  isOnline: Boolean,
})
</script>
