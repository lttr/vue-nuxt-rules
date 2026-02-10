<template>
  <div class="profile-card">
    <div class="profile-card__header">
      <img
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="profile-card__avatar"
        @error="onImageError"
      />
    </div>
    <div class="profile-card__body">
      <h2 class="profile-card__name">{{ name }}</h2>
      <p v-if="bio" class="profile-card__bio">{{ bio }}</p>
    </div>
    <div v-if="socialLinks.length" class="profile-card__socials">
      <a
        v-for="link in socialLinks"
        :key="link.url"
        :href="link.url"
        class="profile-card__social-link"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="link.platform"
        :title="link.platform"
      >
        <span class="profile-card__social-icon">{{ platformIcon(link.platform) }}</span>
        <span class="profile-card__social-label">{{ link.platform }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SocialLink {
  platform: string
  url: string
}

export interface ProfileCardProps {
  avatar: string
  name: string
  bio?: string
  socialLinks?: SocialLink[]
}

const props = withDefaults(defineProps<ProfileCardProps>(), {
  bio: '',
  socialLinks: () => [],
})

const fallbackAvatar = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#e2e8f0" width="100" height="100"/><text x="50" y="55" text-anchor="middle" dominant-baseline="middle" font-size="40" fill="#94a3b8">?</text></svg>'
)

function onImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = fallbackAvatar
}

const icons: Record<string, string> = {
  github: '&#9679;',
  twitter: '&#128038;',
  linkedin: '&#128279;',
  facebook: '&#102;',
  instagram: '&#128247;',
  youtube: '&#9654;',
  website: '&#127760;',
}

function platformIcon(platform: string): string {
  return icons[platform.toLowerCase()] ?? '🔗'
}
</script>

<style scoped>
.profile-card {
  max-width: 320px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: box-shadow 0.2s ease;
}

.profile-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.profile-card__header {
  display: flex;
  justify-content: center;
  padding: 24px 24px 0;
}

.profile-card__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e2e8f0;
}

.profile-card__body {
  padding: 16px 24px;
  text-align: center;
}

.profile-card__name {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.profile-card__bio {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #64748b;
}

.profile-card__socials {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 24px 20px;
  flex-wrap: wrap;
}

.profile-card__social-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  background: #f1f5f9;
  color: #475569;
  text-decoration: none;
  font-size: 0.8rem;
  transition: background 0.15s ease, color 0.15s ease;
}

.profile-card__social-link:hover {
  background: #3b82f6;
  color: #ffffff;
}

.profile-card__social-icon {
  font-size: 0.9rem;
}

.profile-card__social-label {
  text-transform: capitalize;
}
</style>
