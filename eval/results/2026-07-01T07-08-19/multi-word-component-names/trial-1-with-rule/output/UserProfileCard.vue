<template>
  <div class="user-profile-card">
    <img class="user-profile-card__avatar" :src="avatar" :alt="`${name} avatar`" />
    <h2 class="user-profile-card__name">{{ name }}</h2>
    <p class="user-profile-card__bio">{{ bio }}</p>
    <ul v-if="socialLinks.length" class="user-profile-card__links">
      <li v-for="link in socialLinks" :key="link.url">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  avatar: {
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
  },
})
</script>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  max-width: 320px;
  text-align: center;
}

.user-profile-card__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
}

.user-profile-card__name {
  margin: 0;
  font-size: 1.25rem;
}

.user-profile-card__bio {
  margin: 0;
  color: #555;
}

.user-profile-card__links {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}

.user-profile-card__links a {
  color: #3366cc;
  text-decoration: none;
}

.user-profile-card__links a:hover {
  text-decoration: underline;
}
</style>
