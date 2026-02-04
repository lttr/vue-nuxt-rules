<template>
  <div class="user-profile-card">
    <div class="avatar-container">
      <img
        :src="avatar"
        :alt="`${name}'s avatar`"
        class="avatar"
      />
    </div>
    <div class="profile-info">
      <h2 class="name">{{ name }}</h2>
      <p v-if="bio" class="bio">{{ bio }}</p>
      <div v-if="socialLinks.length" class="social-links">
        <a
          v-for="link in socialLinks"
          :key="link.url"
          :href="link.url"
          :title="link.platform"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          <span class="social-icon">{{ link.icon }}</span>
          <span v-if="showLabels" class="social-label">{{ link.platform }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  avatar: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  socialLinks: {
    type: Array,
    default: () => [],
    validator: (links) => links.every(link => link.url && link.platform)
  },
  showLabels: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.user-profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 320px;
}

.avatar-container {
  margin-bottom: 1rem;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info {
  text-align: center;
}

.name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.bio {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  color: #555;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;
}

.social-link:hover {
  background-color: #f0f0f0;
  color: #1a1a1a;
}

.social-icon {
  font-size: 1.25rem;
}

.social-label {
  font-size: 0.875rem;
}
</style>
