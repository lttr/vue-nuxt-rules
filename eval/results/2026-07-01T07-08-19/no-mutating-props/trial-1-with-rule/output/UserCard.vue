<template>
  <div class="user-card">
    <p>{{ user.name }} - {{ user.age }}</p>
    <button @click="$emit('update:user', { ...user, age: user.age + 1 })">
      Increment Age
    </button>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
})

defineEmits(['update:user'])
</script>
