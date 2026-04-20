<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <div class="card">
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})
</script>
