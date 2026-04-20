<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
    validator: (value) =>
      typeof value.name === 'string' && typeof value.age === 'number',
  },
})

function incrementAge(user) {
  user.age += 1
}
</script>

<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>Age: {{ user.age }}</p>
    <button type="button" @click="incrementAge(user)">
      Increment age
    </button>
  </div>
</template>
