<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
  icon?: string
}

interface Props {
  name: string
  bio?: string
  avatarUrl?: string
  socialLinks?: SocialLink[]
}

const props = withDefaults(defineProps<Props>(), {
  bio: '',
  avatarUrl: '',
  socialLinks: () => [],
})

const initials = computed(() =>
  props.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
)

import { computed } from 'vue'
</script>

<template>
  <div class="profile-card">
    <div class="profile-card__avatar">
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="`${name}'s avatar`"
        class="profile-card__avatar-img"
      />
      <span v-else class="profile-card__avatar-fallback">{{ initials }}</span>
    </div>

    <h2 class="profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="profile-card__bio">{{ bio }}</p>

    <div v-if="socialLinks.length" class="profile-card__links">
      <a
        v-for="link in socialLinks"
        :key="link.platform"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="profile-card__link"
        :aria-label="link.platform"
      >
        {{ link.icon ?? link.platform }}
      </a>
    </div>

    <div v-if="$slots.default" class="profile-card__extra">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.06);
  max-width: 320px;
  text-align: center;
}

.profile-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-card__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card__avatar-fallback {
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
}

.profile-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.profile-card__bio {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}

.profile-card__links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.profile-card__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  background: #f1f5f9;
  color: #334155;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: background 0.15s ease;
}

.profile-card__link:hover {
  background: #e2e8f0;
}

.profile-card__extra {
  width: 100%;
  margin-top: 0.25rem;
}
</style>
