<script setup>
import { ref } from 'vue'
import { useMouse } from './useMouse.js'
import { useItems } from './useItems.js'

const { x, y } = useMouse()
const { items, count, addItem, removeItem, clear } = useItems([
  { id: 1, text: 'Learn Vue 3' },
  { id: 2, text: 'Write composables' },
])

const draft = ref('')

function submit() {
  addItem(draft.value)
  draft.value = ''
}
</script>

<template>
  <section class="mouse-and-items">
    <h2>Mouse position</h2>
    <p>x: {{ x }} — y: {{ y }}</p>

    <h2>Items ({{ count }})</h2>
    <form @submit.prevent="submit">
      <input v-model="draft" placeholder="Add an item" />
      <button type="submit">Add</button>
      <button type="button" @click="clear" :disabled="count === 0">Clear</button>
    </form>

    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
        <button type="button" @click="removeItem(item.id)">Remove</button>
      </li>
    </ul>
  </section>
</template>
