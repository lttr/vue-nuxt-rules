<template>
  <div class="avatar-image">
    <img :src="avatarUrl" :alt="userName" />
    <span v-if="isOnline" class="online-indicator"></span>
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
