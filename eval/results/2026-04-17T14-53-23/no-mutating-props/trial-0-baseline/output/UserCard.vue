<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (value) => typeof value.name === 'string' && typeof value.age === 'number',
  },
})

const emit = defineEmits(['update:user'])

function incrementAge() {
  emit('update:user', { ...props.user, age: props.user.age + 1 })
}
</script>

<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>Age: {{ user.age }}</p>
    <button type="button" @click="incrementAge">Increment age</button>
  </div>
</template>
