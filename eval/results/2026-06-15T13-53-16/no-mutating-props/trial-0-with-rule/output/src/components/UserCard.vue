<script setup>
// Receives a `user` object prop with `name` and `age`.
// Per project rule, props are never mutated directly — instead we emit
// an event asking the parent to update the user.
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:user'])

function incrementAge() {
  // Emit a new object with the incremented age; do not mutate the prop.
  emit('update:user', { ...props.user, age: props.user.age + 1 })
}
</script>

<template>
  <div class="user-card">
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <button type="button" @click="incrementAge">Increment age</button>
  </div>
</template>
