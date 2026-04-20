<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  socialLinks: {
    type: Array,
    default: () => [],
    validator: (links) =>
      links.every(
        (l) => typeof l?.platform === 'string' && typeof l?.url === 'string',
      ),
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
  <article class="profile-card">
    <div class="profile-card__avatar">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="profile-card__avatar-img"
      />
      <span v-else class="profile-card__avatar-fallback" aria-hidden="true">
        {{ initials }}
      </span>
    </div>

    <h2 class="profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="profile-card__bio">{{ bio }}</p>

    <ul v-if="socialLinks.length" class="profile-card__socials">
      <li
        v-for="link in socialLinks"
        :key="link.platform + link.url"
        class="profile-card__social-item"
      >
        <a
          :href="link.url"
          :aria-label="`${name} on ${link.platform}`"
          target="_blank"
          rel="noopener noreferrer"
          class="profile-card__social-link"
        >
          <slot name="social-icon" :platform="link.platform">
            {{ link.platform }}
          </slot>
        </a>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--profile-card-bg, #fff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-width: 320px;
  text-align: center;
}

.profile-card__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-card__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card__avatar-fallback {
  font-size: 2rem;
  font-weight: 600;
  color: #4b5563;
}

.profile-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.profile-card__bio {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.4;
}

.profile-card__socials {
  display: flex;
  gap: 0.75rem;
  padding: 0;
  margin: 0.25rem 0 0;
  list-style: none;
}

.profile-card__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: #f3f4f6;
  color: #111827;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.15s ease;
}

.profile-card__social-link:hover,
.profile-card__social-link:focus-visible {
  background: #e5e7eb;
}
</style>
