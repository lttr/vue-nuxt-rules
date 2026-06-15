<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  /**
   * List of social links to display.
   * Each entry: { label: string, url: string, icon?: string }
   */
  socialLinks: {
    type: Array,
    default: () => [],
    validator: (links) =>
      links.every((link) => typeof link.url === 'string' && typeof link.label === 'string'),
  },
})

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
    <header class="user-profile-card__header">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="user-profile-card__avatar"
      />
      <div v-else class="user-profile-card__avatar user-profile-card__avatar--fallback" aria-hidden="true">
        {{ initials }}
      </div>
      <h2 class="user-profile-card__name">{{ name }}</h2>
    </header>

    <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>

    <nav v-if="socialLinks.length" class="user-profile-card__links" aria-label="Social links">
      <a
        v-for="link in socialLinks"
        :key="link.url"
        :href="link.url"
        class="user-profile-card__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span v-if="link.icon" class="user-profile-card__link-icon" aria-hidden="true">{{ link.icon }}</span>
        {{ link.label }}
      </a>
    </nav>
  </article>
</template>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 20rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.user-profile-card__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.user-profile-card__avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile-card__avatar--fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
  background: #e2e8f0;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.user-profile-card__bio {
  margin: 0;
  color: #475569;
  text-align: center;
  line-height: 1.5;
}

.user-profile-card__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.user-profile-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #2563eb;
  text-decoration: none;
  font-size: 0.875rem;
}

.user-profile-card__link:hover {
  text-decoration: underline;
}
</style>
