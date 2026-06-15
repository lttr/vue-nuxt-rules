<script setup>
import { ref } from 'vue'
import RatingInput from './RatingInput.vue'

// Parent owns the value: it can READ `rating` and CONTROL it (e.g. reset).
const rating = ref(3)
</script>

<template>
  <div>
    <RatingInput v-model="rating" />
    <p>Selected rating: {{ rating || 'none' }}</p>
    <button type="button" @click="rating = 0">Reset</button>
    <button type="button" @click="rating = 5">Set to 5</button>
  </div>
</template>
