<script setup>
import { ref } from 'vue'
import { useMouse } from '../composables/useMouse.js'
import { useItems } from '../composables/useItems.js'

const { x, y } = useMouse()
const { items, count, add, remove, clear } = useItems(['Apple', 'Banana'])

const draft = ref('')

function onAdd() {
  const value = draft.value.trim()
  if (!value) return
  add(value)
  draft.value = ''
}
</script>

<template>
  <section class="mouse-and-items">
    <h2>Mouse position</h2>
    <p>x: {{ x }}, y: {{ y }}</p>

    <h2>Items ({{ count }})</h2>
    <form @submit.prevent="onAdd">
      <input v-model="draft" placeholder="New item" />
      <button type="submit">Add</button>
      <button type="button" @click="clear" :disabled="count === 0">Clear</button>
    </form>
    <ul>
      <li v-for="(item, i) in items" :key="i">
        {{ item }}
        <button type="button" @click="remove(i)">x</button>
      </li>
    </ul>
  </section>
</template>
