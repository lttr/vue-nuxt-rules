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
    validator: (links) =>
      links.every(
        (link) =>
          typeof link === 'object' &&
          typeof link.platform === 'string' &&
          typeof link.url === 'string'
      ),
  },
})
</script>

<template>
  <article class="profile-card">
    <img :src="avatar" :alt="`${name}'s avatar`" class="profile-card__avatar" />
    <h2 class="profile-card__name">{{ name }}</h2>
    <p v-if="bio" class="profile-card__bio">{{ bio }}</p>
    <ul v-if="socialLinks.length" class="profile-card__social">
      <li v-for="link in socialLinks" :key="link.platform">
        <a
          :href="link.url"
          :aria-label="`${name} on ${link.platform}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <slot name="icon" :platform="link.platform">
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
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: var(--profile-card-bg, #fff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 20rem;
  text-align: center;
}

.profile-card__avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-card__name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.profile-card__bio {
  margin: 0 0 1rem;
  color: var(--profile-card-muted, #555);
  font-size: 0.95rem;
  line-height: 1.4;
}

.profile-card__social {
  display: flex;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-card__social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  background: var(--profile-card-link-bg, #f1f3f5);
  color: inherit;
  text-decoration: none;
  font-size: 0.85rem;
}

.profile-card__social a:hover,
.profile-card__social a:focus-visible {
  background: var(--profile-card-link-hover-bg, #e2e6ea);
}
</style>
