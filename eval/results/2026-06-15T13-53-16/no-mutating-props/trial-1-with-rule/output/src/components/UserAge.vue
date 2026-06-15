<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:user'])

function incrementAge() {
  // Do NOT mutate the prop; emit a new user object to the parent instead.
  emit('update:user', { ...props.user, age: props.user.age + 1 })
}
</script>

<template>
  <div class="user-age">
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <button type="button" @click="incrementAge">Increment age</button>
  </div>
</template>
