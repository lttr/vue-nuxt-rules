<template>
  <div class="profile-card">
    <div class="profile-card__avatar-wrapper">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="profile-card__avatar"
      />
      <div v-else class="profile-card__avatar-fallback" aria-hidden="true">
        {{ initials }}
      </div>
    </div>

    <div class="profile-card__body">
      <h2 class="profile-card__name">{{ name }}</h2>
      <p v-if="bio" class="profile-card__bio">{{ bio }}</p>

      <ul v-if="socialLinks.length" class="profile-card__social">
        <li v-for="link in socialLinks" :key="link.url">
          <a
            :href="link.url"
            :aria-label="link.label"
            class="profile-card__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component :is="link.icon" v-if="link.icon" class="profile-card__social-icon" />
            <span>{{ link.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  socialLinks: {
    type: Array,
    default: () => [],
    // Each item: { label: string, url: string, icon?: Component }
  },
})

const initials = computed(() =>
  props.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)
</script>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-width: 320px;
  text-align: center;
}

.profile-card__avatar,
.profile-card__avatar-fallback {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-card__avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6366f1;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.profile-card__bio {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
}

.profile-card__social {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
}

.profile-card__social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  font-size: 0.8rem;
  color: #374151;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
}

.profile-card__social-link:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.profile-card__social-icon {
  width: 1em;
  height: 1em;
}
</style>
