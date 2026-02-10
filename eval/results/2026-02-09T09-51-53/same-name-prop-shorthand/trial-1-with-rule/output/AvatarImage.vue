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
    <span v-if="isOnline" class="online-indicator"></span>
  </div>
</template>
