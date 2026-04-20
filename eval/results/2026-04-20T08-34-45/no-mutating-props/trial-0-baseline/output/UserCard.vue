<template>
  <div>
    <p>Name: {{ localUser.name }}</p>
    <p>Age: {{ localUser.age }}</p>
    <button @click="incrementAge">Increment Age</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const localUser = reactive({ ...props.user })

function incrementAge() {
  localUser.age++
}
</script>
