<template>
  <div class="user-card">
    <p>{{ user.name }} is {{ user.age }} years old</p>
    <button @click="user.age++">Increment Age</button>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>
