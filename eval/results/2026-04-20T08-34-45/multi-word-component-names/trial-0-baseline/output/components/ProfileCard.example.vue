<template>
  <ProfileCard
    name="Jane Doe"
    avatar="https://i.pravatar.cc/150?img=47"
    bio="Full-stack engineer. Open source contributor. Coffee enthusiast."
    :social-links="links"
  />
</template>

<script setup>
import ProfileCard from './ProfileCard.vue'

const links = [
  { label: 'GitHub', url: 'https://github.com/janedoe' },
  { label: 'Twitter', url: 'https://twitter.com/janedoe' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
]
</script>
