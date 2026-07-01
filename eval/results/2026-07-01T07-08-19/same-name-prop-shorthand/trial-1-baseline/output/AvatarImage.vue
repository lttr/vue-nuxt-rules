<template>
  <div class="avatar-image">
    <img :src="avatarUrl" :alt="userName" class="avatar-image__img" />
    <span
      class="avatar-image__status"
      :class="isOnline ? 'avatar-image__status--online' : 'avatar-image__status--offline'"
    ></span>
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
  border: 2px solid #fff;
}

.avatar-image__status--online {
  background-color: #22c55e;
}

.avatar-image__status--offline {
  background-color: #9ca3af;
}
</style>
