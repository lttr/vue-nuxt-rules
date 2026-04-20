<template>
  <ProfileCard
    name="Jane Smith"
    avatar="https://i.pravatar.cc/150?u=jane"
    bio="Full-stack engineer. OSS contributor. Coffee enthusiast."
    :social-links="links"
  />
</template>

<script setup>
import ProfileCard from './ProfileCard.vue'

const links = [
  { label: 'GitHub', url: 'https://github.com/janesmith' },
  { label: 'Twitter', url: 'https://twitter.com/janesmith' },
  { label: 'Website', url: 'https://janesmith.dev' },
]
</script>
