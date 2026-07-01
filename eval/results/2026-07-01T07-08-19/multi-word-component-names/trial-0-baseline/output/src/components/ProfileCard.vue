<template>
  <div class="profile-card">
    <img class="profile-card__avatar" :src="avatar" :alt="`${name}'s avatar`" />
    <h2 class="profile-card__name">{{ name }}</h2>
    <p v-if="bio" class="profile-card__bio">{{ bio }}</p>
    <ul v-if="socialLinks.length" class="profile-card__links">
      <li v-for="link in socialLinks" :key="link.url">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://www.gravatar.com/avatar/?d=mp',
  },
  bio: {
    type: String,
    default: '',
  },
  socialLinks: {
    type: Array,
    default: () => [],
    // each item: { label: String, url: String }
  },
})
</script>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 320px;
  font-family: system-ui, sans-serif;
}

.profile-card__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

.profile-card__bio {
  margin: 0 0 1rem;
  color: #555;
  font-size: 0.95rem;
}

.profile-card__links {
  display: flex;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-card__links a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.profile-card__links a:hover {
  text-decoration: underline;
}
</style>
