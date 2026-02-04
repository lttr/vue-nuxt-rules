<script setup>
defineProps({
  userName: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="avatar-container">
    <img :src="avatarUrl" :alt="userName" class="avatar-image" />
    <span v-if="isOnline" class="online-indicator"></span>
  </div>
</template>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background-color: #22c55e;
  border-radius: 50%;
  border: 2px solid white;
}
</style>
