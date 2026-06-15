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
    />
  </div>
</template>
