<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (u) => typeof u.name === 'string' && typeof u.age === 'number'
  }
})

const local = reactive({ name: props.user.name, age: props.user.age })

watch(
  () => props.user,
  (u) => {
    local.name = u.name
    local.age = u.age
  }
)

function incrementAge() {
  local.age++
}
</script>

<template>
  <div class="user-card">
    <h2>{{ local.name }}</h2>
    <p>Age: {{ local.age }}</p>
    <button type="button" @click="incrementAge">Increment age</button>
  </div>
</template>
