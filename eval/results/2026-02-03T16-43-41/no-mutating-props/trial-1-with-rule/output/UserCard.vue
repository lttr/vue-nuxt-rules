<script setup lang="ts">
interface User {
  name: string
  age: number
}

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  'update:user': [user: User]
}>()

function incrementAge() {
  emit('update:user', { ...props.user, age: props.user.age + 1 })
}
</script>

<template>
  <div class="user-card">
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <button @click="incrementAge">Increment Age</button>
  </div>
</template>
