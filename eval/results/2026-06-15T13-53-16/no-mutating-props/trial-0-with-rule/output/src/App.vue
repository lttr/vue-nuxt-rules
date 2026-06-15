<script setup>
import { reactive } from 'vue'
import UserCard from './components/UserCard.vue'

// The parent owns the state. UserCard emits `update:user`, and the parent
// applies the change — props flow down, events flow up.
const user = reactive({ name: 'Ada', age: 30 })

function handleUpdateUser(updated) {
  Object.assign(user, updated)
}
</script>

<template>
  <UserCard :user="user" @update:user="handleUpdateUser" />
</template>
