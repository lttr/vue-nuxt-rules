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
    validator: (links) =>
      links.every((link) => typeof link.url === 'string' && typeof link.label === 'string'),
  },
})
</script>

<template>
  <div class="user-profile-card">
    <div class="user-profile-card__header">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="user-profile-card__avatar"
      />
      <div v-else class="user-profile-card__avatar user-profile-card__avatar--placeholder">
        {{ name.charAt(0).toUpperCase() }}
      </div>
      <h2 class="user-profile-card__name">{{ name }}</h2>
    </div>

    <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>

    <ul v-if="socialLinks.length" class="user-profile-card__links">
      <li v-for="link in socialLinks" :key="link.url">
        <a
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="user-profile-card__link"
        >
          <span v-if="link.icon" class="user-profile-card__link-icon" v-html="link.icon" />
          {{ link.label }}
        </a>
      </li>
    </ul>

    <div v-if="$slots.default" class="user-profile-card__extra">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.user-profile-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  max-width: 360px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.user-profile-card__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.user-profile-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile-card__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6366f1;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.user-profile-card__bio {
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 16px 0;
}

.user-profile-card__links {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.user-profile-card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #6366f1;
  text-decoration: none;
  font-size: 0.875rem;
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: background 0.15s, border-color 0.15s;
}

.user-profile-card__link:hover {
  background: #f1f5f9;
  border-color: #6366f1;
}

.user-profile-card__link-icon {
  display: inline-flex;
  width: 16px;
  height: 16px;
}

.user-profile-card__extra {
  margin-top: 16px;
}
</style>
