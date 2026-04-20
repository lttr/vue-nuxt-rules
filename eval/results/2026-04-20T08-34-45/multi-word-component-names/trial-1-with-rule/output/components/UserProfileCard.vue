<template>
  <div class="user-profile-card">
    <img
      v-if="avatar"
      :src="avatar"
      :alt="`${name}'s avatar`"
      class="user-profile-card__avatar"
    />
    <div v-else class="user-profile-card__avatar-placeholder">
      {{ initials }}
    </div>

    <div class="user-profile-card__body">
      <h2 class="user-profile-card__name">{{ name }}</h2>
      <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>

      <ul v-if="socialLinks.length" class="user-profile-card__links">
        <li v-for="link in socialLinks" :key="link.url">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
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
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  socialLinks: {
    type: Array,
    default: () => [],
    // Each item: { label: string, url: string }
  },
})

const initials = computed(() =>
  props.name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)
</script>

<style scoped>
.user-profile-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #fff;
  max-width: 360px;
}

.user-profile-card__avatar,
.user-profile-card__avatar-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
}

.user-profile-card__avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cbd5e1;
  color: #475569;
  font-weight: 600;
  font-size: 1.25rem;
}

.user-profile-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
}

.user-profile-card__bio {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.4;
}

.user-profile-card__links {
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.user-profile-card__links a {
  font-size: 0.8125rem;
  color: #3b82f6;
  text-decoration: none;
}

.user-profile-card__links a:hover {
  text-decoration: underline;
}
</style>
