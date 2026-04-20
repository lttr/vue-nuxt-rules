<script setup lang="ts">
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
</script>

<template>
  <article class="user-profile-card">
    <img
      v-if="props.avatarUrl"
      :src="props.avatarUrl"
      :alt="props.avatarAlt || `${props.name} avatar`"
      class="user-profile-card__avatar"
    />
    <div v-else class="user-profile-card__avatar user-profile-card__avatar--placeholder" aria-hidden="true">
      {{ props.name.charAt(0).toUpperCase() }}
    </div>

    <h2 class="user-profile-card__name">{{ props.name }}</h2>

    <p v-if="props.bio" class="user-profile-card__bio">{{ props.bio }}</p>

    <ul v-if="props.socialLinks.length" class="user-profile-card__socials">
      <li v-for="link in props.socialLinks" :key="link.url">
        <a
          :href="link.url"
          :aria-label="link.label || link.platform"
          target="_blank"
          rel="noopener noreferrer"
          class="user-profile-card__social-link"
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
  max-width: 20rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.user-profile-card__avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f4f6;
}

.user-profile-card__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 600;
  color: #6b7280;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.user-profile-card__bio {
  margin: 0;
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
}

.user-profile-card__socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.user-profile-card__social-link {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
}

.user-profile-card__social-link:hover,
.user-profile-card__social-link:focus {
  text-decoration: underline;
}
</style>
