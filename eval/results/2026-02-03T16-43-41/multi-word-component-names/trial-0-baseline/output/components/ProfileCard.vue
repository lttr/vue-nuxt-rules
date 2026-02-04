<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
  icon?: string
}

interface Props {
  avatar?: string
  name: string
  bio?: string
  socialLinks?: SocialLink[]
}

withDefaults(defineProps<Props>(), {
  avatar: '',
  bio: '',
  socialLinks: () => []
})
</script>

<template>
  <div class="profile-card">
    <div class="profile-card__avatar">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="profile-card__avatar-img"
      />
      <div v-else class="profile-card__avatar-placeholder">
        {{ name.charAt(0).toUpperCase() }}
      </div>
    </div>

    <h2 class="profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="profile-card__bio">{{ bio }}</p>

    <div v-if="socialLinks.length" class="profile-card__socials">
      <a
        v-for="link in socialLinks"
        :key="link.platform"
        :href="link.url"
        :title="link.platform"
        class="profile-card__social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span v-if="link.icon" class="profile-card__social-icon">{{ link.icon }}</span>
        <span v-else>{{ link.platform }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 320px;
}

.profile-card__avatar {
  width: 96px;
  height: 96px;
  margin-bottom: 1rem;
}

.profile-card__avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile-card__avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #6366f1;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
}

.profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.profile-card__bio {
  margin: 0 0 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

.profile-card__socials {
  display: flex;
  gap: 0.75rem;
}

.profile-card__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  background-color: #f3f4f6;
  color: #374151;
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.profile-card__social-link:hover {
  background-color: #e5e7eb;
}

.profile-card__social-icon {
  font-size: 1.25rem;
}
</style>
