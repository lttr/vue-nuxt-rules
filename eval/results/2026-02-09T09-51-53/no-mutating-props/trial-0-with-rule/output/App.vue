<template>
  <UserCard :user="user" @increment-age="user.age++" />
</template>

<script setup>
import { reactive } from 'vue';
import UserCard from './UserCard.vue';

const user = reactive({ name: 'Alice', age: 30 });
</script>
