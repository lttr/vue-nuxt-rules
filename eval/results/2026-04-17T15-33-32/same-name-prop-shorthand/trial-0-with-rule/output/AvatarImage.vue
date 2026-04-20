<script setup>
defineProps({
  userName: String,
  avatarUrl: String,
  isOnline: Boolean,
})
</script>

<template>
  <div class="avatar">
    <img :src="avatarUrl" :alt="userName" />
    <span :class="['status', { online: isOnline }]"></span>
  </div>
</template>
