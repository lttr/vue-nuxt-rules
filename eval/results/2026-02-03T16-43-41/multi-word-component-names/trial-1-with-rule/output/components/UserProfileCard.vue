<template>
  <div class="user-profile-card">
    <div class="user-profile-card__avatar">
      <img
        :src="avatar || defaultAvatar"
        :alt="`${name}'s avatar`"
        class="user-profile-card__avatar-image"
      />
    </div>
    <div class="user-profile-card__content">
      <h3 class="user-profile-card__name">{{ name }}</h3>
      <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>
      <div v-if="socialLinks.length" class="user-profile-card__socials">
        <a
          v-for="link in socialLinks"
          :key="link.platform"
          :href="link.url"
          :aria-label="link.platform"
          class="user-profile-card__social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="user-profile-card__social-icon">{{ getSocialIcon(link.platform) }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
}

interface Props {
  name: string
  avatar?: string
  bio?: string
  socialLinks?: SocialLink[]
}

const props = withDefaults(defineProps<Props>(), {
  avatar: '',
  bio: '',
  socialLinks: () => []
})

const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E'

const socialIcons: Record<string, string> = {
  twitter: '𝕏',
  github: '⌘',
  linkedin: 'in',
  facebook: 'f',
  instagram: '📷',
  youtube: '▶',
  email: '✉',
}

function getSocialIcon(platform: string): string {
  return socialIcons[platform.toLowerCase()] || '🔗'
}
</script>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 320px;
}

.user-profile-card__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #f0f0f0;
}

.user-profile-card__avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-profile-card__content {
  text-align: center;
}

.user-profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.user-profile-card__bio {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
}

.user-profile-card__socials {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.user-profile-card__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f5;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.2s;
}

.user-profile-card__social-link:hover {
  background: #e0e0e0;
  transform: scale(1.1);
}

.user-profile-card__social-icon {
  font-size: 0.875rem;
}
</style>
