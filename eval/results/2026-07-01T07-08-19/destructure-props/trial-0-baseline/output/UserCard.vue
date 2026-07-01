<template>
  <div class="user-card">
    <img :src="avatar" :alt="name" class="user-card__avatar" />
    <div class="user-card__info">
      <h3 class="user-card__name">{{ name }}</h3>
      <p class="user-card__email">{{ email }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const DEFAULT_AVATAR = 'https://via.placeholder.com/96'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
})

const avatar = computed(() => props.avatarUrl || DEFAULT_AVATAR)
const greeting = computed(() => `Hello, ${props.name}!`)

console.log(greeting.value)
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.user-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__name {
  margin: 0;
  font-size: 1.1rem;
}

.user-card__email {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
