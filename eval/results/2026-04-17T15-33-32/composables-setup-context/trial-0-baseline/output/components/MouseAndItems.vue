<script setup>
import { ref } from 'vue'
import { useMouse } from '../composables/useMouse.js'
import { useItems } from '../composables/useItems.js'

const { x, y } = useMouse()
const { items, add, remove, clear } = useItems(['Apple', 'Banana'])

const draft = ref('')

function submit() {
  add(draft.value)
  draft.value = ''
}
</script>

<template>
  <section class="mouse-and-items">
    <h2>Mouse position</h2>
    <p>x: {{ x }}, y: {{ y }}</p>

    <h2>Items ({{ items.length }})</h2>
    <form @submit.prevent="submit">
      <input v-model="draft" placeholder="Add an item" />
      <button type="submit">Add</button>
      <button type="button" @click="clear" :disabled="!items.length">Clear</button>
    </form>

    <ul>
      <li v-for="(item, i) in items" :key="i">
        {{ item }}
        <button type="button" @click="remove(i)">x</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.mouse-and-items { font-family: sans-serif; padding: 1rem; }
form { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
li { display: flex; align-items: center; gap: 0.5rem; }
</style>
