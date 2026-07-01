<template>
  <div class="user-profile">
    <AvatarImage
      :userName="userName"
      :avatarUrl="avatarUrl"
      :isOnline="isOnline"
    />
    <div class="user-profile__info">
      <p class="user-profile__name">{{ userName }}</p>
      <p class="user-profile__status">{{ isOnline ? 'Online' : 'Offline' }}</p>
    </div>
  </div>
</template>

<script setup>
import AvatarImage from './AvatarImage.vue'

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
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-profile__name {
  font-weight: 600;
  margin: 0;
}

.user-profile__status {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}
</style>
