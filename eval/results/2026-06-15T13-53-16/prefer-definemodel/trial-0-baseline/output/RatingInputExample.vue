<script setup>
import { ref } from 'vue'
import RatingInput from './RatingInput.vue'

// The parent owns the value — it can read `score` and set it programmatically.
const score = ref(3)
</script>

<template>
  <div>
    <RatingInput v-model="score" />

    <p>Selected rating: {{ score || 'none' }}</p>

    <!-- Parent controlling the value programmatically -->
    <button type="button" @click="score = 5">Set to 5</button>
    <button type="button" @click="score = 0">Clear</button>
  </div>
</template>
