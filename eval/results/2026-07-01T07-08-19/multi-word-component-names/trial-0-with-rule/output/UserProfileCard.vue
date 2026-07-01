<script setup>
defineProps({
  avatarUrl: {
    type: String,
    required: true,
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
    // Array of { label, url, icon? }
  },
})
</script>

<template>
  <div class="user-profile-card">
    <img class="user-profile-card__avatar" :src="avatarUrl" :alt="`${name}'s avatar`" />
    <h2 class="user-profile-card__name">{{ name }}</h2>
    <p v-if="bio" class="user-profile-card__bio">{{ bio }}</p>
    <ul v-if="socialLinks.length" class="user-profile-card__links">
      <li v-for="link in socialLinks" :key="link.url">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  max-width: 320px;
  text-align: center;
}

.user-profile-card__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.75rem;
}

.user-profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.user-profile-card__bio {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: #555;
}

.user-profile-card__links {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-profile-card__links a {
  text-decoration: none;
  color: #3b82f6;
  font-size: 0.9rem;
}

.user-profile-card__links a:hover {
  text-decoration: underline;
}
</style>
