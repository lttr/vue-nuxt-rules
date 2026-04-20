<template>
  <div>
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <button @click="incrementAge">Increment Age</button>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:user'])

function incrementAge() {
  emit('update:user', { ...props.user, age: props.user.age + 1 })
}
</script>
