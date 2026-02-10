<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 32px; background: #f8fafc;">
    <!-- Full profile -->
    <ProfileCard
      avatar="https://i.pravatar.cc/150?u=jane"
      name="Jane Doe"
      bio="Full-stack developer passionate about open source and design systems."
      :social-links="[
        { platform: 'GitHub', url: 'https://github.com/janedoe' },
        { platform: 'Twitter', url: 'https://twitter.com/janedoe' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
      ]"
    />

    <!-- Minimal profile (no bio, no socials) -->
    <ProfileCard
      avatar="https://i.pravatar.cc/150?u=john"
      name="John Smith"
    />

    <!-- Profile with bio, no socials -->
    <ProfileCard
      avatar="https://i.pravatar.cc/150?u=alex"
      name="Alex Rivera"
      bio="UX researcher and accessibility advocate."
    />
  </div>
</template>

<script setup lang="ts">
import ProfileCard from './ProfileCard.vue'
</script>
