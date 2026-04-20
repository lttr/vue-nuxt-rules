<script setup>
defineProps({
  userName: String,
  avatarUrl: String,
  isOnline: Boolean,
})
</script>

<template>
  <div class="avatar-image">
    <img :src="avatarUrl" :alt="userName" />
    <span v-if="isOnline" class="status-online">●</span>
    <span class="user-name">{{ userName }}</span>
  </div>
</template>
