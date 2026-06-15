<script setup>
import { reactive, toRefs } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (u) => typeof u.name === 'string' && typeof u.age === 'number',
  },
})

// Local reactive copy so the component can increment age without mutating the prop.
const localUser = reactive({ ...props.user })
const { name, age } = toRefs(localUser)

function incrementAge() {
  localUser.age++
}
</script>

<template>
  <div class="user-card">
    <h2>{{ name }}</h2>
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

button {
  cursor: pointer;
}
</style>
