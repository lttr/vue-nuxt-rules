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
    // Each element: { label: string, url: string, icon?: Component }
  },
})

const initials = computed(() =>
  props.name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)
</script>

<style scoped>
.profile-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.1);
  max-width: 24rem;
}

.profile-card__avatar-wrapper {
  flex-shrink: 0;
}

.profile-card__avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.profile-card__avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #6366f1;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  user-select: none;
}

.profile-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;
}

.profile-card__name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  color: #111827;
}

.profile-card__bio {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
}

.profile-card__social {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
}

.profile-card__social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}

.profile-card__social-link:hover {
  text-decoration: underline;
}

.profile-card__social-icon {
  width: 1em;
  height: 1em;
}
</style>
