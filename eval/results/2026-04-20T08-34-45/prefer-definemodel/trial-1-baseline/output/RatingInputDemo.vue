<template>
  <div>
    <RatingInput v-model="rating" />
    <p>Selected: {{ rating }} / 5</p>
    <button @click="rating = 0">Clear</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RatingInput from './RatingInput.vue'

const rating = ref(0)
</script>
