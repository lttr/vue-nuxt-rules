<template>
  <div class="avatar-image" :class="{ 'is-online': isOnline }">
    <img :src="avatarUrl" :alt="userName" />
    <span class="status-dot" :title="isOnline ? 'Online' : 'Offline'"></span>
  </div>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
})
</script>
