<template>
  <div class="user-card">
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ localAge }}</p>
    <button @click="incrementAge">Increment Age</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:user'])

const localAge = ref(props.user.age)

watch(() => props.user.age, (newAge) => {
  localAge.value = newAge
})

function incrementAge() {
  localAge.value++
  emit('update:user', { ...props.user, age: localAge.value })
}
</script>
