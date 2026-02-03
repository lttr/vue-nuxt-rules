<template>
  <div class="profile-card">
    <div class="profile-card__header">
      <img
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="profile-card__avatar"
      />
    </div>
    <div class="profile-card__body">
      <h2 class="profile-card__name">{{ name }}</h2>
      <p v-if="bio" class="profile-card__bio">{{ bio }}</p>
      <ul v-if="socialLinks.length" class="profile-card__socials">
        <li v-for="link in socialLinks" :key="link.url">
          <a
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="profile-card__social-link"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
      <div class="profile-card__extra">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SocialLink {
  label: string
  url: string
}

export interface ProfileCardProps {
  avatar: string
  name: string
  bio?: string
  socialLinks?: SocialLink[]
}

withDefaults(defineProps<ProfileCardProps>(), {
  bio: '',
  socialLinks: () => [],
})
</script>

<style scoped>
.profile-card {
  max-width: 360px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  font-family: system-ui, -apple-system, sans-serif;
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
  border: 3px solid #e5e7eb;
}

.profile-card__body {
  padding: 16px 24px 24px;
  text-align: center;
}

.profile-card__name {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.profile-card__bio {
  margin: 0 0 16px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #6b7280;
}

.profile-card__socials {
  list-style: none;
  margin: 0 0 12px;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-card__social-link {
  display: inline-block;
  padding: 6px 14px;
  font-size: 0.8125rem;
  color: #2563eb;
  text-decoration: none;
  border: 1px solid #2563eb;
  border-radius: 9999px;
  transition: background 0.15s, color 0.15s;
}

.profile-card__social-link:hover {
  background: #2563eb;
  color: #fff;
}

.profile-card__extra:empty {
  display: none;
}
</style>
