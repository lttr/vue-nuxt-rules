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
  // Array of { platform, url, label? }
  // e.g. [{ platform: 'github', url: 'https://github.com/jane' }]
  socialLinks: {
    type: Array,
    default: () => [],
  },
})

// Fallback to initials when no avatar image is provided.
const initials = computed(() => {
  return props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
})
</script>

<template>
  <article class="profile-card">
    <div class="profile-card__avatar">
      <img v-if="avatar" :src="avatar" :alt="`${name}'s avatar`" />
      <span v-else class="profile-card__initials" aria-hidden="true">
        {{ initials }}
      </span>
    </div>

    <h2 class="profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="profile-card__bio">{{ bio }}</p>

    <ul v-if="socialLinks.length" class="profile-card__social">
      <li v-for="link in socialLinks" :key="link.url">
        <a
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="link.label || link.platform"
        >
          {{ link.label || link.platform }}
        </a>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 20rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.profile-card__avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #edf2f7;
  margin-bottom: 1rem;
}

.profile-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card__initials {
  font-size: 1.75rem;
  font-weight: 600;
  color: #4a5568;
}

.profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #1a202c;
}

.profile-card__bio {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #4a5568;
}

.profile-card__social {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.profile-card__social a {
  font-size: 0.85rem;
  color: #3182ce;
  text-decoration: none;
}

.profile-card__social a:hover {
  text-decoration: underline;
}
</style>
