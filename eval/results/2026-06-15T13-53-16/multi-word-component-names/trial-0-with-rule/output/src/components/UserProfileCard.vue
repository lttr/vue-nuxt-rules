<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Display name of the user. */
  name: {
    type: String,
    required: true,
  },
  /** URL of the user's avatar image. */
  avatarUrl: {
    type: String,
    default: '',
  },
  /** Short biography / description. */
  bio: {
    type: String,
    default: '',
  },
  /**
   * Social links to display.
   * Each item: { label: string, url: string, icon?: string }
   */
  socialLinks: {
    type: Array,
    default: () => [],
  },
})

// Fallback initials shown when no avatar image is provided.
const initials = computed(() =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join(''),
)
</script>

<template>
  <article class="user-profile-card">
    <div class="user-profile-card__avatar">
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="`${name}'s avatar`"
        class="user-profile-card__avatar-img"
      />
      <span v-else aria-hidden="true" class="user-profile-card__avatar-fallback">
        {{ initials }}
      </span>
    </div>

    <h2 class="user-profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>

    <ul v-if="socialLinks.length" class="user-profile-card__links">
      <li v-for="link in socialLinks" :key="link.url">
        <a
          :href="link.url"
          class="user-profile-card__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span v-if="link.icon" class="user-profile-card__link-icon">{{ link.icon }}</span>
          {{ link.label }}
        </a>
      </li>
    </ul>

    <!-- Allow consumers to inject extra content (badges, actions, etc.). -->
    <slot />
  </article>
</template>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 20rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-profile-card__avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;
  background: #edf2f7;
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
  font-size: 1.75rem;
  font-weight: 600;
  color: #4a5568;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
}

.user-profile-card__bio {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #4a5568;
}

.user-profile-card__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.user-profile-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background: #edf2f7;
  color: #2b6cb0;
  font-size: 0.8rem;
  text-decoration: none;
  transition: background 0.15s ease;
}

.user-profile-card__link:hover {
  background: #e2e8f0;
}
</style>
