<template>
  <div class="user-profile-card">
    <div class="avatar-wrapper">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="avatar"
      />
      <div v-else class="avatar-fallback">{{ initials }}</div>
    </div>

    <div class="profile-info">
      <h2 class="name">{{ name }}</h2>
      <p v-if="bio" class="bio">{{ bio }}</p>

      <ul v-if="socialLinks.length" class="social-links">
        <li v-for="link in socialLinks" :key="link.url">
          <a :href="link.url" target="_blank" rel="noopener noreferrer" class="social-link">
            <span v-if="link.icon" class="social-icon">{{ link.icon }}</span>
            <span>{{ link.label }}</span>
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
    // Each item: { label: String, url: String, icon?: String }
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
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 320px;
  text-align: center;
}

.avatar-wrapper {
  flex-shrink: 0;
}

.avatar,
.avatar-fallback {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.avatar {
  object-fit: cover;
}

.avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6366f1;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.bio {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

.social-links {
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  color: #6366f1;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background: #eef2ff;
  transition: background 0.15s;
}

.social-link:hover {
  background: #e0e7ff;
}
</style>
