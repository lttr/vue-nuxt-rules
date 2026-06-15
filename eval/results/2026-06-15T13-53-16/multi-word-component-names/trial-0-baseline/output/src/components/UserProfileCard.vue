<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** User's display name. */
  name: {
    type: String,
    required: true,
  },
  /** URL of the user's avatar image. */
  avatar: {
    type: String,
    default: '',
  },
  /** Short biography text. */
  bio: {
    type: String,
    default: '',
  },
  /**
   * Social links to display.
   * Each entry: { platform: string, url: string, label?: string }
   */
  socialLinks: {
    type: Array,
    default: () => [],
    validator: (links) =>
      links.every((l) => l && typeof l.url === 'string' && typeof l.platform === 'string'),
  },
})

// Initials shown when no avatar image is provided.
const initials = computed(() =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
)
</script>

<template>
  <article class="profile-card">
    <div class="profile-card__avatar">
      <img v-if="avatar" :src="avatar" :alt="`${name}'s avatar`" />
      <span v-else class="profile-card__initials" aria-hidden="true">{{ initials }}</span>
    </div>

    <h2 class="profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="profile-card__bio">{{ bio }}</p>

    <ul v-if="socialLinks.length" class="profile-card__links">
      <li v-for="link in socialLinks" :key="link.platform + link.url">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
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
  gap: 0.75rem;
  max-width: 20rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--profile-card-bg, #fff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.profile-card__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--profile-card-avatar-bg, #e2e8f0);
}

.profile-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card__initials {
  font-size: 2rem;
  font-weight: 600;
  color: var(--profile-card-initials-color, #475569);
}

.profile-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.profile-card__bio {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--profile-card-bio-color, #64748b);
}

.profile-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.profile-card__links a {
  font-size: 0.875rem;
  color: var(--profile-card-link-color, #2563eb);
  text-decoration: none;
}

.profile-card__links a:hover {
  text-decoration: underline;
}
</style>
