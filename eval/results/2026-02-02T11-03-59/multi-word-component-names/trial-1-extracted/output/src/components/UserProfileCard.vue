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
</script>

<template>
  <div class="user-profile-card">
    <div class="user-profile-card__avatar">
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="`${name}'s avatar`"
        class="user-profile-card__avatar-img"
      />
      <span v-else class="user-profile-card__avatar-fallback">
        {{ initials }}
      </span>
    </div>

    <h3 class="user-profile-card__name">{{ name }}</h3>

    <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>

    <div v-if="socialLinks.length" class="user-profile-card__links">
      <a
        v-for="link in socialLinks"
        :key="link.platform"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="user-profile-card__link"
        :title="link.platform"
      >
        {{ link.icon ?? link.platform }}
      </a>
    </div>

    <div class="user-profile-card__extra">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  max-width: 320px;
  text-align: center;
}

.user-profile-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile-card__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-profile-card__avatar-fallback {
  font-size: 1.5rem;
  font-weight: 600;
  color: #64748b;
}

.user-profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.user-profile-card__bio {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}

.user-profile-card__links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.user-profile-card__link {
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background 0.15s;
}

.user-profile-card__link:hover {
  background: #eff6ff;
}

.user-profile-card__extra:empty {
  display: none;
}
</style>
