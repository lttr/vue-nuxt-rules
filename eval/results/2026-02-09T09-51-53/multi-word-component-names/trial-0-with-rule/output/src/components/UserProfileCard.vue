<template>
  <div class="user-profile-card">
    <div class="user-profile-card__avatar">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="user-profile-card__avatar-img"
      />
      <div v-else class="user-profile-card__avatar-placeholder">
        {{ initials }}
      </div>
    </div>

    <h2 class="user-profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>

    <ul v-if="socialLinks.length" class="user-profile-card__socials">
      <li
        v-for="link in socialLinks"
        :key="link.url"
        class="user-profile-card__socials-item"
      >
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          {{ link.label }}
        </a>
      </li>
    </ul>

    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  socialLinks: {
    type: Array,
    default: () => [],
    validator: (links) =>
      links.every((link) => typeof link.url === 'string' && typeof link.label === 'string'),
  },
})

const initials = computed(() =>
  props.name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
)
</script>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 360px;
  text-align: center;
}

.user-profile-card__avatar {
  margin-bottom: 1rem;
}

.user-profile-card__avatar-img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile-card__avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #555;
}

.user-profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.user-profile-card__bio {
  margin: 0 0 1rem;
  color: #666;
  line-height: 1.5;
}

.user-profile-card__socials {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.user-profile-card__socials-item a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.user-profile-card__socials-item a:hover {
  text-decoration: underline;
}
</style>
