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
  <div class="avatar-image">
    <img :src="avatarUrl" :alt="userName" class="avatar" />
    <span class="status" :class="{ online: isOnline, offline: !isOnline }"></span>
  </div>
</template>

<style scoped>
.avatar-image {
  position: relative;
  display: inline-block;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}
.status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.status.online {
  background-color: #4caf50;
}
.status.offline {
  background-color: #9e9e9e;
}
</style>
