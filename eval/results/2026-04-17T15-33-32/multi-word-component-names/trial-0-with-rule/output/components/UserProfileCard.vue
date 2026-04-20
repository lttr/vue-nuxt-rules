<script setup lang="ts">
import { computed } from 'vue'

interface SocialLink {
  platform: string
  url: string
  label?: string
}

interface Props {
  name: string
  bio?: string
  avatarUrl?: string
  avatarAlt?: string
  socialLinks?: SocialLink[]
}

const props = withDefaults(defineProps<Props>(), {
  bio: '',
  avatarUrl: '',
  avatarAlt: '',
  socialLinks: () => [],
})

const initials = computed(() =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join(''),
)
</script>

<template>
  <article class="user-profile-card">
    <div class="user-profile-card__avatar">
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="avatarAlt || `${name}'s avatar`"
        class="user-profile-card__avatar-image"
      >
      <span v-else class="user-profile-card__avatar-fallback" aria-hidden="true">
        {{ initials }}
      </span>
    </div>

    <header class="user-profile-card__header">
      <h2 class="user-profile-card__name">{{ name }}</h2>
      <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>
    </header>

    <ul v-if="socialLinks.length" class="user-profile-card__socials">
      <li v-for="link in socialLinks" :key="link.url">
        <a
          :href="link.url"
          :aria-label="link.label || link.platform"
          class="user-profile-card__social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.platform }}
        </a>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: var(--card-bg, #fff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-width: 20rem;
}

.user-profile-card__avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile-card__avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-profile-card__avatar-fallback {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4b5563;
}

.user-profile-card__header {
  text-align: center;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.user-profile-card__bio {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.user-profile-card__socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.user-profile-card__social-link {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: #f3f4f6;
  color: #111827;
  text-decoration: none;
  font-size: 0.875rem;
}

.user-profile-card__social-link:hover {
  background: #e5e7eb;
}
</style>
