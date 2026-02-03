<script setup>
defineProps({
  avatar: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  socialLinks: {
    type: Array,
    default: () => [],
    // Each item: { platform: string, url: string, label?: string }
  },
})
</script>

<template>
  <div class="profile-card">
    <div class="profile-card__avatar-wrapper">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="profile-card__avatar"
      />
      <div v-else class="profile-card__avatar-placeholder">
        {{ name.charAt(0).toUpperCase() }}
      </div>
    </div>

    <h2 class="profile-card__name">{{ name }}</h2>

    <p v-if="bio" class="profile-card__bio">{{ bio }}</p>

    <div v-if="socialLinks.length" class="profile-card__links">
      <a
        v-for="link in socialLinks"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="profile-card__link"
      >
        {{ link.label || link.platform }}
      </a>
    </div>

    <div class="profile-card__extra">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 12px rgb(0 0 0 / 0.08);
  max-width: 360px;
  text-align: center;
}

.profile-card__avatar-wrapper {
  margin-bottom: 1rem;
}

.profile-card__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-card__avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #e0e7ff;
  color: #4338ca;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
}

.profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #111827;
}

.profile-card__bio {
  margin: 0 0 1rem;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
}

.profile-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.profile-card__link {
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: #f3f4f6;
  color: #4338ca;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.15s;
}

.profile-card__link:hover {
  background: #e0e7ff;
}

.profile-card__extra:empty {
  display: none;
}
</style>
