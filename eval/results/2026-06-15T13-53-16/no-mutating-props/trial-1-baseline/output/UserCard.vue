<script setup>
import { ref } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

// Local copy of age so we can increment without mutating the prop directly.
const age = ref(props.user.age)

function incrementAge() {
  age.value++
}
</script>

<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>Age: {{ age }}</p>
    <button type="button" @click="incrementAge">Increment age</button>
  </div>
</template>

<style scoped>
.user-card {
  display: inline-block;
  padding: 1rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: sans-serif;
}

.user-card button {
  margin-top: 0.5rem;
  cursor: pointer;
}
</style>
