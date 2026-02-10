<template>
  <div class="user-card">
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <button @click="$emit('increment-age')">Increment Age</button>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

defineEmits(['increment-age']);
</script>
