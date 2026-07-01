<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
    validator: (u) => 'name' in u && 'age' in u,
  },
})

const emit = defineEmits(['update:user'])

function incrementAge(user) {
  emit('update:user', { ...user, age: user.age + 1 })
}
</script>

<template>
  <div class="user-card">
    <p>{{ user.name }} is {{ user.age }} years old</p>
    <button @click="incrementAge(user)">Increment Age</button>
  </div>
</template>
