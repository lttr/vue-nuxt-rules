<script setup>
import { ref } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const age = ref(props.user.age)

function incrementAge() {
  age.value++
}
</script>

<template>
  <div class="user-card">
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ age }}</p>
    <button @click="incrementAge">Increment Age</button>
  </div>
</template>
