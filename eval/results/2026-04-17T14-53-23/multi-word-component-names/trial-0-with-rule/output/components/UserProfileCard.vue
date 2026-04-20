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
  avatar?: string
  avatarAlt?: string
  socialLinks?: SocialLink[]
}

const props = withDefaults(defineProps<Props>(), {
  bio: '',
  avatar: '',
  avatarAlt: '',
  socialLinks: () => [],
})

const initials = computed(() =>
  props.name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join(''),
)
</script>

<template>
  <article class="user-profile-card">
    <div class="user-profile-card__avatar">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="avatarAlt || `${name}'s avatar`"
      />
      <span v-else class="user-profile-card__initials" aria-hidden="true">
        {{ initials }}
      </span>
    </div>

    <h2 class="user-profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>

    <ul v-if="socialLinks.length" class="user-profile-card__socials">
      <li v-for="link in socialLinks" :key="link.url">
        <a
          :href="link.url"
          :aria-label="link.label || link.platform"
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
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  max-width: 20rem;
  text-align: center;
}

.user-profile-card__avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-profile-card__initials {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4b5563;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.user-profile-card__bio {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

.user-profile-card__socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  padding: 0;
  margin: 0.25rem 0 0;
  list-style: none;
}

.user-profile-card__socials a {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.875rem;
}

.user-profile-card__socials a:hover,
.user-profile-card__socials a:focus {
  text-decoration: underline;
}
</style>
