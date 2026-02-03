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
          {{ link.label }}
        </a>
      </li>
    </ul>

    <slot />
  </div>
</template>

<style scoped>
.user-profile-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 360px;
  font-family: inherit;
}

.user-profile-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-profile-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile-card__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6366f1;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.25rem;
}

.user-profile-card__bio {
  color: #555;
  line-height: 1.5;
  margin: 0 0 1rem;
}

.user-profile-card__links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.user-profile-card__link {
  color: #6366f1;
  text-decoration: none;
}

.user-profile-card__link:hover {
  text-decoration: underline;
}
</style>
