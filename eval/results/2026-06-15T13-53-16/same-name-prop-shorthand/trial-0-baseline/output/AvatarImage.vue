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

<template>
  <div class="avatar-image">
    <img :src="avatarUrl" :alt="userName" class="avatar-image__img" />
    <span
      class="avatar-image__status"
      :class="{ 'avatar-image__status--online': isOnline }"
      :title="isOnline ? 'Online' : 'Offline'"
    ></span>
  </div>
</template>

<style scoped>
.avatar-image {
  position: relative;
  display: inline-block;
}

.avatar-image__img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-image__status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #9ca3af;
  border: 2px solid #fff;
}

.avatar-image__status--online {
  background-color: #22c55e;
}
</style>
